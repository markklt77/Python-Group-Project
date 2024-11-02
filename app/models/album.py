from .db import db
from .album_songs import album_song


class Album(db.Model):
    __tablename__= 'albums'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    user = db.relationship('User', back_populates='albums')
    song = db.relationship('Song', secondary=album_song, back_populates='album')
