from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album(
        title = 'album1',
        artist_id = 1
    )
    album2 = Album(
        title = 'album2',
        artist_id = 2
    )
    album3 = Album(
        title = 'album3',
        artist_id = 3
    )
    album4 = Album(
        title = 'album4',
        artist_id = 2
    )


    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.commit()



def undo_albums():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM albums'))

    db.session.commit()
