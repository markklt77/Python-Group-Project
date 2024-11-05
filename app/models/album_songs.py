from .db import db, environment, SCHEMA, add_prefix_for_prod

class AlbumSong(db.Model):
    __tablename__ = "album_songs"

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=False)
    added_at = db.Column(db.DateTime, server_default=db.func.now())

    # song = db.relationship("Song", back_populates="albums")
    # album = db.relationship("Album", back_populates="songs")
