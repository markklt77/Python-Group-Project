from flask import Blueprint, jsonify, request, render_template, redirect, url_for
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from ..models import db, Like, Song
from ..aws_helper import allowed_file, get_unique_filename, upload_file_to_s3, remove_file_from_s3

bp = Blueprint('songs', __name__, url_prefix='/songs')


@bp.route('/')
def songs():
    songs = Song.query.options(joinedload(Song.likes)).all()

    return [song.to_dict() for song in songs]


@bp.route('/<songId>')
def songId(songId):
    song = Song.query.get(songId)

    if not song:
        return {'errors': {'message': "Couldn't find song"}}, 404

    return song.to_dict()


@bp.route('/upload-song')
@login_required
def upload_song_form():
    return render_template('upload_song.html')

@bp.route('/', methods=["POST"])
@login_required
def addSong():
    # user_id = current_user.id
    # data = request.json
    # data["artist_id"] = user_id

    # song = Song(**data)
    # db.session.add(song)
    # db.session.commit()

    # return song.to_dict()

    #AWS TESTING
    user_id = current_user.id
    data = request.form.to_dict()
    file = request.files.get('file')

    #does the file exist and is it allowed?
    if not file or not allowed_file(file.filename):
        return {"errors": "Invalid file type or no file uploaded"}, 400

    title = data.get("title")
    genre = data.get("genre")

    if not title:
        return {"errors": "Title is required"}, 400
    if not genre:
        return {"errors": "Genre is required"}, 400

    file.filename = get_unique_filename(file.filename)
    upload_response = upload_file_to_s3(file)

    # Handle errors during upload
    if "errors" in upload_response:
        return jsonify(upload_response), 400

    song = Song(
        title=data.get("title"),
        artist_id=user_id,
        url=upload_response["url"],
        genre=data.get("genre")
    )

    db.session.add(song)
    db.session.commit()

    return song.to_dict(), 201

@bp.route('/<songId>', methods=["PUT"])
@login_required
def editSong(songId):
    song = Song.query.get(songId)

    if not song:
        return {'errors': {'message': "Couldn't find song"}}, 404

    user_id = current_user.id

    if not song.artist_id == user_id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    data = request.json

    if  data["title"]:
        song.title = data["title"]

    if data["url"]:
        song.url = data["url"]

    song.genre = data["genre"]

    db.session.commit()
    return song.to_dict()


# May have a bug
@bp.route('/<songId>', methods=['DELETE'])
@login_required
def deleteSong(songId):
    # song = Song.query.get(songId)

    # if not song:
    #     return {'errors': {'message': "Couldn't find song"}}, 404

    # user_id = current_user.id

    # if not song.artist_id == user_id:
    #     return {'errors': {'message': 'Unauthorized'}}, 401

    # db.session.delete(song)
    # db.session.commit()
    # return { "message": "Success" }

    song = Song.query.get(songId)

    if not song:
        return {"error": {"Song not found"}}, 404

    if song.artist_id != current_user.id:
        return {"error": {"You do not have permission to delete this song"}}, 403

    removal = remove_file_from_s3(song.url)

    if removal is not True:
        return {"errors": "Failed to remove the file from S3"}, 500

    db.session.delete(song)
    db.session.commit()

    return {"message": "Song deleted successfully"}, 200
