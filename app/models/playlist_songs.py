from .db import db

playlist_song = db.Table(
    'playlistSongs',
    db.Model.metadata,
    db.Column('song_id', db.Integer, db.ForeignKey("songs.id"), nullable=False),
    db.Column('playlist_id', db.Integer, db.ForeignKey("playlists.id"), nullable=False)
)
