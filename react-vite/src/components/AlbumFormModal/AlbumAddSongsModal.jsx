import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkAllAlbums } from "../../redux/albums";
import { useNavigate, useParams } from "react-router-dom";
// import AlbumSongTile from "../Albums/AlbumSongTile";
import { thunkAddSong } from "../../redux/albums";
import './albumFormModal.css'


function AlbumAddSongModal({ refresh }) {
    const dispatch = useDispatch();
    let {albumId} = useParams()
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

        const serverResponse = await dispatch(
            thunkAddSong({
                songs: selected,
                id: albumId
            })
        );
        if (serverResponse) {
            setErrors(serverResponse)
            alert(errors.error)
            // console.log(await serverResponse.json(), 'serverRe')
        } else {
            // console.log(await serverResponse.json(), 'serverRe')
            dispatch(thunkAllAlbums())
                .then(() => { navigate(`/albums/${album[album.length - 1].id}`) })
                .then(() => { refresh() })
                .then(() => { closeModal() })
                .then(() => { alert('Songs were added successfully') })



        }
    }


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
            {errors.error && <p>{errors.error}</p>}
            {!user && <p>Must be logged in to create an album</p>}
            {ownerSongs.length > 0 && (
                <div className="add-songs-new-album-modal">
                    <div >
                        <h3>All Songs Belonging To You</h3>
                    </div>
                    <form onSubmit={handleSub}>
                        <div>
                            {ownerSongs.map((song) => {
                                return (
                                    <div key={song.id}>
                                        <input type='checkbox' onChange={() => addSong(song)} key={song.id} value={song.id} />
                                        <label className="add-song-title-modal">{song.title}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <button className="add-song-submit-modal">Add songs to album</button>
                    </form>


                </div>

            )}
        </>
    );
}

export default AlbumAddSongModal;
