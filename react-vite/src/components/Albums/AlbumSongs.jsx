import { useParams } from 'react-router-dom';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { thunkRemoveSong, thunkOneAlbum } from '../../redux/albums'
// import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
// import "./song-tile.css"


function AlbumSongs() {
    // let {albumId} = useParams()
    // let [songDelete, setSongDelete] = useState(false)
    let album_songs = useSelector(state => state.albums.selected)
    let arrSongs = Object.values(album_songs)
    let { albumId } = useParams()
    let dispatch = useDispatch()
    let [errors, setErrors] = useState(null)
    // let
    // console.log(arrSongs)
    let i = 0

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    let deleteSong = async (songId) => {
        // console.log('song',songId)
        // console.log('album',albumId)


        let songInfo = {
            songId,
            albumId: Number(albumId)
        }
        let serverResponse = await dispatch(thunkRemoveSong(songInfo))

        if (serverResponse.message) {
            await dispatch(thunkOneAlbum(albumId)).then(() => {
                alert(serverResponse.message)
            })


        } else {
            setErrors(serverResponse)
            alert(errors.error)
        }
    }

    return (
        <div>
            {arrSongs.length > 0 ? (
                arrSongs.map(song => {
                    i += 1
                    return <div className="song-tile" key={song.id}>
                        <p id="num">{i}</p>
                        <p>{song.title}</p>
                        <p>{song.album.title}</p>
                        <p>
                            {`${months[new Date(song.created_at).getMonth()]} ${new Date(song.created_at).getDay()}, ${new Date(song.created_at).getFullYear()}`}
                        </p>
                        <div className="plus-button" onClick={() => deleteSong(song.id)}>
                            <CiCirclePlus />
                        </div>
                    </div>
                })
            ) : (
                <div>
                    <p> There are currently no songs for this album</p>
                </div>
            )}
        </div>
    )
}





export default AlbumSongs
