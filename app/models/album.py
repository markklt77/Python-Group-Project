from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    user = db.relationship("User", back_populates="albums")
    songs = db.relationship("Song", secondary=add_prefix_for_prod("album_songs"), back_populates="albums")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'artist_id': self.artist_id
        }
