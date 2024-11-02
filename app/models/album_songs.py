from .db import db


album_song = db.Table(
    'albumSongs',
    db.Model.metadata,
    db.Column('song_id', db.Integer, db.ForeignKey("songs.id"), nullable=False),
    db.Column('album_id' ,db.Integer, db.ForeignKey("albums.id"), nullable=False)
)
