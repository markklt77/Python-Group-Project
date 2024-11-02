from .db import db
from .album_songs import album_song
from .playlist_songs import playlist_song
from .like import likes


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    genre = db.Column(db.String(50), nullable=False)


    user = db.relationship('User', back_populates='songs')
    album = db.relationship('Album', secondary=album_song, back_populates='song')
    playlist = db.relationship('Playlist', secondary=playlist_song, back_populates='song')
    user_likes = db.relationship('User', secondary=likes, back_populates='likes_user')
