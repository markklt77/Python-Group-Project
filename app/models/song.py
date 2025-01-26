from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    genre = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())


    user = db.relationship("User", back_populates="songs")
    albums = db.relationship("Album", secondary=add_prefix_for_prod("album_songs"), back_populates="songs")
    playlists = db.relationship("Playlist", secondary=add_prefix_for_prod("playlist_songs"), back_populates="songs")
    likes = db.relationship("Like", back_populates="song", cascade="all, delete-orphan")


    def to_dict(self):
        dict_likes = [like.to_dict() for like in self.likes]

        if self.albums:
            dict_albums = [album.to_dict() for album in self.albums]
            album = dict_albums[0]
        else:
            album = { 'title': 'None' }

        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "artist_id": self.artist_id,
            "genre": self.genre,
            "album": album,
            "likes": dict_likes,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
