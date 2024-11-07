from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


def seed_playlists():
    playlist1 = Playlist(name="My Favorite Songs", user_id=1)
    playlist2 = Playlist(name="Road Trip Tunes", user_id=2)
    playlist3 = Playlist(name="Best Songs OAT", user_id=3)

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.commit()

def undo_playlists():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM playlists'))

    db.session.commit()
