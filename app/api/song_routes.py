from flask import Blueprint, jsonify, request, render_template, redirect, url_for
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from ..models import db, Like, Song
from ..aws_helper import allowed_file, get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.forms import SongForm, UpdateSongForm

song_routes = Blueprint('songs', __name__, url_prefix='/songs')


@song_routes.route('/')
def songs():
    """
    Get all songs
    """
    # print("inside all songs")
    songs = Song.query.options(joinedload(Song.likes)).all()

    return [song.to_dict() for song in songs]


@song_routes.route('/<songId>')
def songId(songId):
    """
    Get a specific song by id
    """
    song = Song.query.get(songId)

    if not song:
        return {'errors': {'message': "Couldn't find song"}}, 404

    return song.to_dict()


@song_routes.route('/upload-song')
@login_required
def upload_song_form():
    return render_template('upload_song.html')

@song_routes.route('/test', methods=["POST"])
@login_required
def addSong():
    """
    A logged in user can add a song
    """
    # user_id = current_user.id
    # data = request.json
    # data["artist_id"] = user_id

    # song = Song(**data)
    # db.session.add(song)
    # db.session.commit()

    # return song.to_dict()

    #AWS TESTING
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # user_id = current_user.id
    # data = request.form.to_dict()
    # file = request.files.get('file')

    if form.validate_on_submit():
        file = form.file.data
        #does the file exist and is it allowed?
        if not allowed_file(file.filename):
            # print("Invalid file type")
            return {"errors": "Invalid file type"}, 400

        # title = data.get("title")
        # genre = data.get("genre")

        file.filename = get_unique_filename(file.filename)
        upload_response = upload_file_to_s3(file)

        # Handle errors during upload
        if "errors" in upload_response:
            # print(upload_response.errors)
            return jsonify(upload_response), 400

        song = Song(
            title=form.title.data,
            artist_id=current_user.id,
            url=upload_response["url"],
            genre=form.genre.data
        )

        db.session.add(song)
        db.session.commit()

        return song.to_dict(), 201
    else:
        # print form.errors
        return jsonify(form.errors), 400

@song_routes.route('/<songId>', methods=["PUT"])
@login_required
def editSong(songId):
    """
    A logged in user can edit/update a song
    """
    song = Song.query.get(songId)

    if not song:
        return {'errors': {'message': "Couldn't find song"}}, 404

    if song.artist_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    form = UpdateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        if form.title.data:
            song.title = form.title.data


        if form.genre.data:
            song.genre = form.genre.data

        # handle file upload if a new file is submitted.... should users even be able to do this?
        # if form.file.data:
        #     file = form.file.data
        #     file.filename = get_unique_filename(file.filename)
        #     upload_response = upload_file_to_s3(file)

        #     if "errors" in upload_response:
        #         return jsonify(upload_response), 400

        #     song.url = upload_response["url"]


        db.session.commit()
        return song.to_dict(), 200

    else:
        return jsonify(form.errors), 400


# May have a bug
@song_routes.route('/<songId>', methods=['DELETE'])
@login_required
def deleteSong(songId):
    """
    A logged in user can delete their owned songs
    """
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

# Like a Song
@song_routes.route('/<songId>/likes', methods=['POST'])
@login_required
def likes(songId):
    """
    A logged in user can like a song
    """
    artistId = current_user.id
    like = Like.query.filter_by(artist_id=artistId, song_id=songId).first()

    if not like:
        newLike = Like(artist_id=artistId, song_id=songId)

        db.session.add(newLike)
        db.session.commit()
        return {'message': "Success"}, 200

# Unlike a Song
@song_routes.route('/<songId>/likes', methods=['DELETE'])
@login_required
def like(songId):
    """
    A logged in user can unlike a song
    """
    artistId = current_user.id
    like = Like.query.filter_by(artist_id=artistId, song_id=songId).first()

    if not like:
        return {"error": {"Like not found"}}, 404

    if like.artist_id != current_user.id:
        return {"error": {"You do not have permission to delete this like"}}, 403

    db.session.delete(like)
    db.session.commit()

    return {'message': "Successfully deleted"}, 200
