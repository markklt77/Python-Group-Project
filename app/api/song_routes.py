from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from ..models import db, Song

song_routes = Blueprint('songs', __name__, url_prefix='/songs')


@song_routes.route('/')
def songs():
    """
    Get all songs
    """
    songs = Song.query.options(joinedload(Song.likes)).all()

    return [song.to_dict() for song in songs]


@song_routes.route('/<int:songId>')
def songId(songId):
    """
    Get a specific song by id
    """
    song = Song.query.options(joinedload(Song.likes)).get(songId)

    if not song:
        return {'errors': {'message': "Couldn't find song"}}, 404

    return song.to_dict()


@song_routes.route('/', methods=["POST"])
@login_required
def addSong():
    """
    A logged in user can add a song
    """
    user_id = current_user.id
    data = request.json
    data["artist_id"] = user_id

    song = Song(**data)
    db.session.add(song)
    db.session.commit()

    return song.to_dict()


# Maybe change PUT to PATCH
@song_routes.route('/<int:songId>', methods=["PUT"])
@login_required
def editSong(songId):
    """
    A logged in user can edit/update a song
    """
    song = Song.query.get(songId)

    if not song:
        return {'errors': {'message': "Couldn't find song"}}, 404

    user_id = current_user.id

    if not song.artist_id == user_id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    data = request.json

    # Define error handlers
    if  data["title"]:
        song.title = data["title"]

    # if data["url"]:
    #     song.url = data["url"]

    song.genre = data["genre"]

    db.session.commit()
    return song.to_dict()


@song_routes.route('/<int:songId>', methods=['DELETE'])
@login_required
def deleteSong(songId):
    """
    A logged in user can delete their owned songs
    """
    song = Song.query.get(songId)

    if not song:
        return {'errors': {'message': "Couldn't find song"}}, 404

    user_id = current_user.id

    if not song.artist_id == user_id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    db.session.delete(song)
    db.session.commit()
    return { "message": "Success" }
