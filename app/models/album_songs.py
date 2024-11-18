from .db import db, environment, SCHEMA, add_prefix_for_prod

class AlbumSong(db.Model):
    __tablename__ = "album_songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=False)
    added_at = db.Column(db.DateTime, server_default=db.func.now())
