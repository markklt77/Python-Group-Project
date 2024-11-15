import AlbumSongs from './AlbumSongs';
import AlbumTile from './AlbumTile'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'


function AlbumsPage() {
    let {albumId} = useParams()
    let album
    if(albumId){
        album = useSelector(state => state.albums.all[albumId])
    }

    return (
        <div className="content">

            {albumId && album ? (
                <div className="content-header">
                    <p>List of songs for {album.title}</p>
                </div>
            ):(
                <div className="content-header">
                   <p>list of Albums</p>
                </div>
            )}
            <AlbumSongs />
        </div>
    )
}

export default AlbumsPage;
