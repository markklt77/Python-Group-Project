from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.models import Album, db, Song
from app.forms import AlbumForm
from app.models import AlbumSong


album_routes = Blueprint('album', __name__)


@album_routes.route('/')
def album_home():
    """
    Get all albums
    """
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>', methods=['GET','PATCH'])
def specific_album(id):
    """
    Get a specific album and or update the album title
    depending on the requested method
    """
    album = Album.query.get(id)
    if request.method == 'PATCH':
        album.title = request.get_json()["title"]
        db.session.commit()
        return album.to_dict()

    songs = [song.song_id for song in AlbumSong.query.filter_by(album_id=id)]
    easy_album = album.to_dict()

    easy_album['songs'] = songs
    return easy_album

@album_routes.route('/create-album', methods=['GET', 'POST'])
@login_required
def create_album():
    """
    Create an album for the current user
    """
    form = AlbumForm()
    if form.validate_on_submit():
        album = Album(
            title=form.data['title'],
            artist_id=int(current_user.id)
        )
        db.session.add(album)
        db.session.commit()
        return redirect('/api/albums')
# render template only so i can test it works. remove once frontend is done
    return render_template('albums.html', form=form)


@album_routes.route('/<int:albumId>/add-song/<int:songId>', methods=['GET', 'POST'])
@login_required
def add_song(albumId, songId):
    """
    Add a song to an album if the artist id for
    the song and album match the current users id
    """
    album = Album.query.get(albumId)
    song = Song.query.get(songId)

    duos = AlbumSong.query.all()
    if album and album.to_dict()['artist_id'] == current_user.id:
        if song and song.artist_id == album.artist_id:
            albumSong = AlbumSong.query.filter_by(album_id=albumId, song_id=songId).first()
            if not albumSong:
                new_song = AlbumSong(
                    song_id=songId,
                    album_id=albumId
                )
                db.session.add(new_song)
                db.session.commit()
            else:
                return jsonify({'error': 'This song is already added to this album'})
        else:
            return jsonify({'error': 'The song does not belong to you'})
    else:
        return jsonify({'error': 'You do not have access to edit this album'})

    return jsonify({'message': f'{song.title} added to {album.to_dict()["title"]}'})


@album_routes.route('/<int:albumId>/remove-song/<int:songId>', methods=['GET','DELETE'])
@login_required
def remove_song(albumId, songId):
    """
    Remove a chosen song from a specific album
    """
    album = Album.query.get(albumId)
    song = Song.query.get(songId)
    album_song = AlbumSong.query.filter_by(album_id=albumId, song_id=songId).first()

    if album and album.artist_id == current_user.id:
        if song and song.artist_id == current_user.id :
            if album_song:
                db.session.delete(album_song)
                db.session.commit()
            else:
                return jsonify({'error': 'Song is not part of the album'})
        else:
            return jsonify({'error': 'Song does not belong to the current user or no song was found'})
    else:
        return jsonify({'error': 'Album does not belong to the current user or no album was found'})
    return jsonify({'message':f'{song.title} was removed from {album.title}'})
