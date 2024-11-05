from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist(db.Model):
    __tablename__ = "playlists"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    songs = db.relationship("Song", secondary="playlist_songs", back_populates="playlists")
