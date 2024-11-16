from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Playlist, PlaylistSong, Song
from app.forms import PlaylistForm, AddSongToPlaylistForm


playlist_routes = Blueprint('playlists', __name__)


@playlist_routes.route('/test')
@login_required
def get_user_playlists():
    """
    Get all playlists for the current user
    """
    playlists = Playlist.query.filter_by(user_id=current_user.id).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

@playlist_routes.route('/<int:playlist_id>', methods=['GET'])
@login_required
def get_playlist_by_id(playlist_id):
    """
    Get a single playlist by ID if it belongs to the current user
    """
    # Query for the playlist and ensure it belongs to the current user
    playlist = Playlist.query.filter_by(id=playlist_id, user_id=current_user.id).first()

    if not playlist:
        return jsonify({'error': 'Playlist not found'}), 404

    return jsonify(playlist.to_dict()), 200



@playlist_routes.route('/test', methods=['POST'])
@login_required
def create_playlist():
    """
    Create a new playlist for the current user.
    """

    #returns data as python dictionary
    # data = request.get_json()

    # if not data.get('name'):
    #     return {'error': 'Playlist name is required'}, 400

    # playlist = Playlist(
    #     name=data['name'],
    #     user_id=current_user.id
    # )

    # Add the playlist to the db
    # db.session.add(playlist)
    # db.session.commit()

    # # Return the newly created playlist data
    # return jsonify(playlist.to_dict()), 201

    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        playlist = Playlist(
            name=form.data['name'],
            user_id=current_user.id
            )

        db.session.add(playlist)
        db.session.commit()

        return jsonify(playlist.to_dict()), 201
    else:
        return jsonify(form.errors), 400



@playlist_routes.route('/<int:playlist_id>', methods=['DELETE'])
@login_required
def delete_playlist(playlist_id):
    """
    Delete a playlist if the user owns it
    """
    # make sure the playlist belongs to the current user
    playlist = Playlist.query.filter_by(id=playlist_id, user_id=current_user.id).first()

    if not playlist:
        return jsonify({'error': 'Playlist not found'}), 404

    # check if the playlist belongs to the current user
    if playlist.user_id != current_user.id:
        return jsonify({'error': 'You do not have permission to delete this playlist'}), 403

    # Delete the playlist
    db.session.delete(playlist)
    db.session.commit()

    # Return a success message
    return jsonify({'message': 'Playlist deleted successfully'}), 200

@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['POST'])
@login_required
def add_song_to_playlist(playlist_id, song_id):
    """
    Add a song to an existing playlist.
    """


    #USING URL PARAMS

    playlist = Playlist.query.filter_by(id=playlist_id, user_id=current_user.id).first()
    if not playlist:
        return jsonify({'error': 'Playlist not found'}), 404

    song = Song.query.get(song_id)
    if not song:
        return jsonify({'error': 'Song not found'}), 404

    playlist_song = PlaylistSong(playlist_id=playlist_id, song_id=song_id)
    db.session.add(playlist_song)
    db.session.commit()

    return jsonify({'message': 'Song added to playlist', 'playlist': playlist.to_dict()}), 201

@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['DELETE'])
@login_required
def remove_song_from_playlist(playlist_id, song_id):
    """
    Delete a song from an existing playlist that the user owns
    """

    #make sure playlist exists and belongs to user
    playlist = Playlist.query.filter_by(id=playlist_id, user_id=current_user.id).first()
    if not playlist:
        return jsonify({'error': 'Playlist not found'}), 404

    # Check if the playlist belongs to the current user
    if playlist.user_id != current_user.id:
        return jsonify({'error': 'You do not have permission to remove songs from this playlist'}), 403

    # make sure the song exists
    song = Song.query.get(song_id)
    if not song:
        return jsonify({'error': 'Song not found'}), 404

    # Find the association in the PlaylistSong table
    playlist_song = PlaylistSong.query.filter_by(playlist_id=playlist_id, song_id=song_id).first()
    if not playlist_song:
        return jsonify({'error': 'Song is not in the specified playlist'}), 404

    # Remove the song from the playlist
    db.session.delete(playlist_song)
    db.session.commit()

    # Return success response with updated playlist data
    return jsonify({'message': 'Song removed from playlist', 'playlist': playlist.to_dict()}), 200
