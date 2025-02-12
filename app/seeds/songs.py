from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


def seed_songs():
    song1 = Song(
        title='song1',
        url='temp url for song 1',
        artist_id=1,
        genre='rock',
    )
    song2 = Song(
        title='song2',
        url='temp url for song 2',
        artist_id=2,
        genre='pop',
    )
    song3 = Song(
        title='song3',
        url='temp url for song 3',
        artist_id=3,
        genre='rap',
    )
    song4 = Song(
        title='song4',
        url='temp url for song 4',
        artist_id=1,
        genre='hip-hop',
    )
    song5 = Song(
        title='song5',
        url='temp url for song 5',
        artist_id=2,
        genre='classical',
    )
    song6 = Song(
        title='song6',
        url='temp url for song 6',
        artist_id=3,
        genre='hip-hop',
    )
    song7 = Song(
        title='song7',
        url='temp url for song 7',
        artist_id=1,
        genre='salsa',
    )
    song8 = Song(
        title='song8',
        url='temp url for song 8',
        artist_id=2,
        genre='pop',
    )
    song9 = Song(
        title='son91',
        url='temp url for song 9',
        artist_id=3,
        genre='rap',
    )
    song10 = Song(
        title='rice racer',
        url='https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/lose.ogg',
        artist_id=4,
        genre='beats',
    )
    song11 = Song(
        title='code skulptor assets',
        url='https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
        artist_id=3,
        genre='beats',
    )
    song12 = Song(
        title='Galaxy Invaders',
        url='https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3',
        artist_id=2,
        genre='beats',
    )
    song13 = Song(
        title='pang',
        url='https://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3',
        artist_id=1,
        genre='beats',
    )
    song14 = Song(
        title='pyman assets',
        url='https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg',
        artist_id=4,
        genre='beats',
    )
    song15 = Song(
        title='rice racer 2',
        url='https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg',
        artist_id=3,
        genre='beats',
    )
    song16 = Song(
        title='rice racer 3',
        url='https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg',
        artist_id=2,
        genre='beats',
    )
    song17 = Song(
        title='rice racer 4',
        url='https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race2.ogg',
        artist_id=1,
        genre='beats',
    )
    song18 = Song(
        title='rice racer 5',
        url='https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg',
        artist_id=4,
        genre='beats',
    )
    song19 = Song(
        title='descent',
        url='https://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3',
        artist_id=3,
        genre='beats',
    )


    # song20 = Song(
    #     title='rice racer ',
    #     url='',
    #     artist_id=2,
    #     genre='beats',
    # )
    # song21 = Song(
    #     title='rice racer ',
    #     url='',
    #     artist_id=1,
    #     genre='beats',
    # )
    # song22 = Song(
    #     title='rice racer ',
    #     url='',
    #     artist_id=4,
    #     genre='beats',
    # )
    # song23 = Song(
    #     title='rice racer ',
    #     url='',
    #     artist_id=3,
    #     genre='beats',
    # )
    # song24 = Song(
    #     title='rice racer ',
    #     url='',
    #     artist_id=2,
    #     genre='beats',
    # )
    # song25 = Song(
    #     title='rice racer ',
    #     url='',
    #     artist_id=1,
    #     genre='beats',
    # )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)
    db.session.add(song11)
    db.session.add(song12)
    db.session.add(song13)
    db.session.add(song14)
    db.session.add(song15)
    db.session.add(song16)
    db.session.add(song17)
    db.session.add(song18)
    db.session.add(song19)
    db.session.commit()


def undo_songs():
    if environment == 'production':
        db.session.execute(
            f'TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM songs'))

    db.session.commit()
