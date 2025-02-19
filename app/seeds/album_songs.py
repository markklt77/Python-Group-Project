from app.models import db, AlbumSong, environment, SCHEMA
from sqlalchemy.sql import text


def seed_albumSongs():
    albumSong1 = AlbumSong(song_id=1 ,album_id=1 )
    albumSong2 = AlbumSong(song_id=2 ,album_id=1 )
    albumSong3 = AlbumSong(song_id=3 ,album_id=1 )
    albumSong4 = AlbumSong(song_id=4 ,album_id=1 )
    albumSong5 = AlbumSong(song_id=5 ,album_id=1 )
    albumSong6 = AlbumSong(song_id=6 ,album_id=1 )
    albumSong7 = AlbumSong(song_id=7 ,album_id=1 )
    albumSong8 = AlbumSong(song_id=8 ,album_id=1 )
    albumSong9 = AlbumSong(song_id=9 ,album_id=2 )
    albumSong10 = AlbumSong(song_id=10 ,album_id=2 )
    albumSong11= AlbumSong(song_id=11 ,album_id=2 )
    albumSong12 = AlbumSong(song_id=12 ,album_id=2 )
    albumSong13 = AlbumSong(song_id=13 ,album_id=2 )
    albumSong14 = AlbumSong(song_id=14 ,album_id=2 )
    albumSong15 = AlbumSong(song_id=15 ,album_id=2 )
    albumSong16 = AlbumSong(song_id=16 ,album_id=2 )
    albumSong17 = AlbumSong(song_id=17 ,album_id=3 )
    albumSong18 = AlbumSong(song_id=18 ,album_id=3 )
    albumSong19 = AlbumSong(song_id=19 ,album_id=3 )

    db.session.add(albumSong1)
    db.session.add(albumSong2)
    db.session.add(albumSong3)
    db.session.add(albumSong4)
    db.session.add(albumSong5)
    db.session.add(albumSong6)
    db.session.add(albumSong7)
    db.session.add(albumSong8)
    db.session.add(albumSong9)
    db.session.add(albumSong10)
    db.session.add(albumSong11)
    db.session.add(albumSong12)
    db.session.add(albumSong13)
    db.session.add(albumSong14)
    db.session.add(albumSong15)
    db.session.add(albumSong16)
    db.session.add(albumSong17)
    db.session.add(albumSong18)
    db.session.add(albumSong19)

    db.session.commit()



def undo_albumSongs():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.album_songs RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM album_songs'))

    db.session.commit()
