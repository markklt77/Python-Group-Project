from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    songs = db.relationship("Song", secondary=add_prefix_for_prod("playlist_songs"), back_populates="playlists")

    def to_dict(self):
        """
        Convert the Playlist instance to a dictionary format.
        """
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "songs": [song.to_dict() for song in self.songs]
        }
