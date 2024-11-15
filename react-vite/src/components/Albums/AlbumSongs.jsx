// import { useParams } from 'react-router-dom';
// import { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { thunkAllAlbums, thunkOneAlbum } from '../../redux/albums'
// import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
// import "./song-tile.css"

function AlbumSongs(){
    // let {albumId} = useParams()
    // let [isLoaded, setIsLoaded] = useState(false)
    let album_songs = useSelector(state => state.albums.selected)
    let arrSongs = Object.values(album_songs)
    // console.log(arrSongs)
    let i = 0

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]


    return (
        <div>
            {arrSongs.length > 0 ? (
                arrSongs.map(song => {
                    i += 1
                    return  <div className="song-tile" key={song.id}>
                    <p id="num">{i}</p>
                    <p>{song.title}</p>
                    <p>{song.album.title}</p>
                    <p>
                        {`${months[new Date(song.created_at).getMonth()]} ${new Date(song.created_at).getDay()}, ${new Date(song.created_at).getFullYear()}`}
                    </p>
                    <div className="plus-button">
                        <CiCirclePlus />
                    </div>
                </div>
                })
            ):(
                <div>
                    <p> There are currently no songs for this album</p>
                </div>
            )}
        </div>
    )
}



export default AlbumSongs
