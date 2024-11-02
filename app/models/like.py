from .db import db


likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column('song_id', db.Integer, db.ForeignKey("songs.id"), nullable=False),
    db.Column('user_id', db.Integer, db.ForeignKey("user.id"), nullable=False)
)
