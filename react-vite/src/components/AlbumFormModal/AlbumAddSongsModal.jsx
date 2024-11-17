import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { thunkAllAlbums, thunkMakeAlbum } from "../../redux/albums";
import { useNavigate } from "react-router-dom";
// import AlbumSongTile from "../Albums/AlbumSongTile";
import { thunkAddSong } from "../../redux/albums";


function AlbumAddSongModal() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    let navigate = useNavigate()
    const allSongsFlat = useSelector(state => state.songs.all)
    const arrSongs = Object.values(allSongsFlat)
    const ownerSongs = arrSongs.filter(song => {
        return song.artist_id == user.id
    })
    let albums = useSelector(state => state.albums.all)
    let album = Object.values(albums)

    let selected = []
    const handleSub = async (e) => {
        e.preventDefault();
        // console.log(selected)
        // console.log(album[album.length-1])
            const serverResponse = await dispatch(
                thunkAddSong({
                    songs: selected,
                    id: album[album.length - 1].id
                })
            );
            if (serverResponse) {
                setErrors(serverResponse)
            } else {
                navigate(`/albums/${album[album.length - 1].id}`)
                closeModal()
                alert('Album was created')
            }
        }


    // console.log(selected)


    const addSong = (song) => {
        let found = selected.filter(thisSong => {
            return song.id == thisSong.id
        })

        if (found.length > 0) {
            selected = selected.filter(thisSong => {
                // console.log(song.id, thisSong.id)
                return song.id !== thisSong.id
            })
            // console.log(selected, 'removing the song')
        } else {
            selected.push(song)
            // console.log(selected, 'adding the song')
        }


    }

    return (
        <>
            <h1>Add songs to new Album</h1>
            {errors.error && <p>{errors.error}</p>}
            {!user && <p>Must be logged in to create an album</p>}
            {ownerSongs.length > 0 && (
                <div>
                    <div className="content-header">
                        <h1>All Songs Belonging To You</h1>
                    </div>
                    <form onSubmit={handleSub}>
                        <div className="container-song-tile"
                        >
                            {ownerSongs.map((song) => {
                                return (
                                    <div key={song.id}>
                                        <input type='checkbox' onChange={() => addSong(song)} key={song.id} value={song.id} />
                                        <label>{song.title}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <button>Add songs to album</button>
                    </form>


                </div>

            )}
        </>
    );
}

export default AlbumAddSongModal;
