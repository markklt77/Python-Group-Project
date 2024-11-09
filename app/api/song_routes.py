from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models.song import db, Song

bp = Blueprint('songs', __name__, url_prefix='/songs')


@bp.route('/')
def songs():
    songs = Song.query.all()
    return [song.to_dict() for song in songs]


@bp.route('/<songId>')
def songId(songId):
    song = Song.query.get(songId)

    if not song:
        raise Exception("Couldn't find song")

    return song.to_dict()


@bp.route('/', methods=["POST"])
@login_required
def addSong():
    user_id = current_user.id
    data = request.json
    data["artist_id"] = user_id

    song = Song(**data)
    db.session.add(song)
    db.session.commit()

    return song.to_dict()


@bp.route('/<songId>', methods=["PUT"])
@login_required
def editSong(songId):
    song = Song.query.get(songId)

    if not song:
        raise Exception("Couldn't find song")

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


@bp.route('/<songId>', methods=['DELETE'])
@login_required
def deleteSong(songId):
    song = Song.query.get(songId)

    if not song:
        raise Exception("Couldn't find song")

    user_id = current_user.id

    if not song.artist_id == user_id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    db.session.delete(song)
    db.session.commit()
    return { "message": "Success" }
