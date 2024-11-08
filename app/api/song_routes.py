from flask import Blueprint, request
from ..models.song import db, Song

bp = Blueprint('songs', __name__, url_prefix='/songs')

@bp.route('/')
def songs():
    songs = Song.query.all()
    return [song.to_dict() for song in songs]


@bp.route('/<songId>')
def songId(songId):
    song = Song.query.get(songId)
    return song.to_dict()


@bp.route('/', methods=["POST"])
def addSong():
    data = request.json
    song = Song(**data)
    db.session.add(song)
    db.session.commit()
    return song.to_dict()

