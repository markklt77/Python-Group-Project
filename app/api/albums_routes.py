from flask import Blueprint, jsonify, render_template, redirect
from flask_login import login_required, current_user
from app.models import Album, db, Song
from app.forms import AlbumForm
from app.models import AlbumSong


album_routes = Blueprint('album', __name__)

@album_routes.route('/')
def album_home():
    albums = Album.query.all()
    print(albums)
    return {'albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>')
def specific_album(id):
    album = Album.query.get(id)
    return album.to_dict()


@album_routes.route('/create-album', methods=['GET','POST'])
@login_required
def create_album():
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




@album_routes.route('/<int:albumId>/add-song/<int:songId>', methods=['GET','POST'])
@login_required
def add_song(albumId, songId):
    # print('asdasdsdasdsadsasdasd',id)
    # print(type(current_user.id))
    album = Album.query.get(albumId)
    song = Song.query.get(songId)
    print(song.id, song.artistId)
    # print(type(album.to_dict()['artist_id']))
    duos = AlbumSong.query.all()
    if album.to_dict['artist_id'] == current_user.id:
        AlbumSong(
            song_id =  songId,
            album_id = albumId
        )


    return hi
