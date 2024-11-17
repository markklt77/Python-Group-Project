from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


def seed_songs():
    song1 = Song(
        title = 'song1',
        url = 'temp url for song 1',
        artist_id = 1,
        genre = 'rock',
    )
    song2 = Song(
        title = 'song2',
        url = 'temp url for song 2',
        artist_id = 2,
        genre = 'pop',
    )
    song3 = Song(
        title = 'song3',
        url = 'temp url for song 3',
        artist_id = 3,
        genre = 'rap',
    )
    song4 = Song(
        title = 'song4',
        url = 'temp url for song 4',
        artist_id = 1,
        genre = 'hip-hop',
    )
    song5 = Song(
        title = 'song5',
        url = 'temp url for song 5',
        artist_id = 2,
        genre = 'classical',
    )
    song6 = Song(
        title = 'song6',
        url = 'temp url for song 6',
        artist_id = 3,
        genre = 'hip-hop',
    )
    song7 = Song(
        title = 'song7',
        url = 'temp url for song 7',
        artist_id = 1,
        genre = 'salsa',
    )
    song8 = Song(
        title = 'song8',
        url = 'temp url for song 8',
        artist_id = 2,
        genre = 'pop',
    )
    song9 = Song(
        title = 'son91',
        url = 'temp url for song 9',
        artist_id = 3,
        genre = 'rap',
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.commit()



def undo_songs():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM songs'))

    db.session.commit()
