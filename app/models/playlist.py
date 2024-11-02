from .db import db
from .playlist_songs import playlist_song


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    user = db.relationship('User', back_populates='playlists')
    song = db.relationship('Song', secondary=playlist_song, back_populates='playlist')
