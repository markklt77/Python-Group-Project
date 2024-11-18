from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    liked_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="likes")
    song = db.relationship("Song", back_populates="likes")


    def to_dict(self):
        return {
            "id": self.id,
            "artist_id": self.artist_id,
            "song_id": self.song_id,
            "liked_at": self.liked_at
        }
