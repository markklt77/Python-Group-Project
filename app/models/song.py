from .db import db, add_prefix_for_prod

class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    genre = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())


    user = db.relationship("User", back_populates="songs")
    albums = db.relationship("Album", secondary="album_songs", back_populates="songs")
    playlists = db.relationship("Playlist", secondary="playlist_songs", back_populates="songs")
    likes = db.relationship("Like", back_populates="song", cascade="all, delete-orphan")

    def to_dict(self):
        '''
        Helper function to convert data to a dictionary. Necessary for json encoding.
        '''

        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "artist_id": self.artist_id,
            "genre": self.genre,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
