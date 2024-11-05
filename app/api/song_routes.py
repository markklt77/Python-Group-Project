from flask import Blueprint
from ..models.song import Song

bp = Blueprint('songs', __name__, url_prefix='/songs')

@bp.route('/')
def songs():
    songs = Song.query.all()
