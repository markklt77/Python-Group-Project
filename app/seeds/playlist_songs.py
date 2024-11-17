from app.models import db, PlaylistSong, environment, SCHEMA
from sqlalchemy.sql import text


def seed_playlistSongs():
    playlistSong1 = PlaylistSong(playlist_id=1, song_id=1)
    playlistSong2 = PlaylistSong(playlist_id=1, song_id=2)
    playlistSong3 = PlaylistSong(playlist_id=1, song_id=3)
    playlistSong4 = PlaylistSong(playlist_id=2, song_id=4)
    playlistSong5 = PlaylistSong(playlist_id=2, song_id=5)
    playlistSong6 = PlaylistSong(playlist_id=2, song_id=6)
    playlistSong7 = PlaylistSong(playlist_id=3, song_id=7)
    playlistSong8 = PlaylistSong(playlist_id=3, song_id=8)
    playlistSong9 = PlaylistSong(playlist_id=3, song_id=9)
    playlistSong10 = PlaylistSong(playlist_id=3, song_id=1)

    db.session.add(playlistSong1)
    db.session.add(playlistSong2)
    db.session.add(playlistSong3)
    db.session.add(playlistSong4)
    db.session.add(playlistSong5)
    db.session.add(playlistSong6)
    db.session.add(playlistSong7)
    db.session.add(playlistSong8)
    db.session.add(playlistSong9)
    db.session.add(playlistSong10)
    db.session.commit()


def undo_playlistSongs():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM playlist_songs'))

    db.session.commit()
