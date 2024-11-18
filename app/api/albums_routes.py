from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.models import Album, db, Song
from app.forms import AlbumForm
from app.models import AlbumSong
import json


album_routes = Blueprint('album', __name__)


@album_routes.route('/')
def album_home():
    """
    Get all albums
    """
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>')
def get_specific_album(id):
    """
    Get a selected album
    """
    album = Album.query.get(id)
    if album:
        songs_ids = [
            songId.song_id for songId in AlbumSong.query.filter_by(album_id=id)]
        songs = []
        if len(songs_ids) > 0:
            for song_id in songs_ids:
                song = Song.query.get(song_id)
                # songs[int(song.id)] = song.to_dict()
                songs.append(song.to_dict())

        easy_album = album.to_dict()
        easy_album['songs'] = songs
        return easy_album

    else:
        return jsonify({'error': 'Album does not exist'}), 404


@album_routes.route('/<int:id>', methods=['PATCH', 'DELETE'])
@login_required
def del_patch_specific_album(id):
    """
    Update a selected album or delete a selected album
    """
    album = Album.query.get(id)
    albumsSongs = AlbumSong.query.filter_by(album_id=id).all()
    if not album:
        return jsonify({'error': 'Album does not exist'}), 404

    if album.artist_id != current_user.id:
        return jsonify({'error': 'Album does not belong to you'}), 401

    if request.method == 'PATCH':
        form = AlbumForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            album.title = form.data['title']
            db.session.commit()
            return jsonify({'message': 'Successfully changed album name'})
        else:
            return form.errors, 400

    if request.method == 'DELETE':
        if len(albumsSongs) > 0:
            for song in albumsSongs:
                db.session.delete(song)
                db.session.commit()
        db.session.delete(album)
        db.session.commit()
        return jsonify({"message": "Deleted album"})


# @album_routes.route('/create-album')
# @login_required
# def album_form():
#     form = AlbumForm()
#     return render_template('albums.html', form=form)

@album_routes.route('/create-album', methods=['POST'])
@login_required
def create_album():
    """
    Create an album for the current user
    """
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # data = json.load(request.data.decode("utf-8").strip().split("/n"))
    # print(form.title,'the data in backend')
    data = [json.loads(line) for line in request.data.decode(
        "utf-8").strip().split("\n")]
    # form.title.value = data[0]['title']
    # print(data, 'data from the back')
    if form.validate_on_submit():
        album = Album(
            title=data[0]['title'],
            artist_id=int(current_user.id)
        )

        db.session.add(album)
        db.session.commit()
        # return redirect('/api/albums')
        return jsonify({'message': f'Album {album.title} was created'})
    else:
        return jsonify(form.errors), 400
    # return render_template('albums.html', form=form)


@album_routes.route('/<int:albumId>/song/<int:songId>', methods=['POST', 'DELETE'])
@login_required
def add_song(albumId, songId):
    """
    Add a song to an album if the artist id for
    the song and album match the current users id
    """
    album = Album.query.get(albumId)
    song = Song.query.get(songId)
    # print('from the back data', request.data)

    if request.method == 'DELETE':
        album_song = AlbumSong.query.filter_by(
            album_id=albumId, song_id=songId).first()

        if album:
            if album.artist_id == current_user.id:
                if song:
                    if song.artist_id == current_user.id:
                        if album_song:
                            db.session.delete(album_song)
                            db.session.commit()
                        else:
                            return jsonify({'error': 'Song is not part of the album'}), 404
                    else:
                        return jsonify({'error': 'Song does not belong to the current user'}), 403
                else:
                    return jsonify({'error': 'No song was found'}), 404
            else:
                return jsonify({'error': 'Album does not belong to you'}), 403
        else:
            return jsonify({'error': 'No album was found'}), 404
        return jsonify({'message': f'{song.title} was removed from {album.title}'})

    if request.method == 'POST':
        if album:
            if album.to_dict()['artist_id'] == current_user.id:
                if song:
                    if song.artist_id == album.artist_id:
                        albumSong = AlbumSong.query.filter_by(
                            album_id=albumId, song_id=songId).first()
                        if not albumSong:
                            new_song = AlbumSong(
                                song_id=songId,
                                album_id=albumId
                            )
                            db.session.add(new_song)
                            db.session.commit()
                        else:
                            return jsonify({'error': 'This song is already added to this album'}), 409
                    else:
                        return jsonify({'error': 'Song does not belong to you'}), 403
                else:
                    return jsonify({'error': 'Song does not exist'}), 404
            else:
                return jsonify({'error': 'Album does not belong to you'}), 403
        else:
            return jsonify({'error': 'Album does not exist'}), 404

        return jsonify({'message': f'{song.title} added to {album.to_dict()["title"]}'})


# @album_routes.route('/<int:albumId>/remove-song/<int:songId>', methods=['DELETE'])
# @login_required
# def remove_song(albumId, songId):
#     """
#     Remove a chosen song from a specific album
#     """
#     album = Album.query.get(albumId)
#     song = Song.query.get(songId)
#     album_song = AlbumSong.query.filter_by(album_id=albumId, song_id=songId).first()

#     if album and album.artist_id == current_user.id:
#         if song and song.artist_id == current_user.id :
#             if album_song:
#                 db.session.delete(album_song)
#                 db.session.commit()
#             else:
#                 return jsonify({'error': 'Song is not part of the album'})
#         else:
#             return jsonify({'error': 'Song does not belong to the current user or no song was found'})
#     else:
#         return jsonify({'error': 'Album does not belong to the current user or no album was found'})
#     return jsonify({'message':f'{song.title} was removed from {album.title}'})
