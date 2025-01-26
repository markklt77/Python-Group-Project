import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkAllAlbums, thunkChangeAlbum } from "../../redux/albums";
import { useParams } from "react-router-dom";
import './albumFormModal.css'

function AlbumNameFormModal({ refresh }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const { albumId } = useParams()
    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums.all[albumId])


    let handleSubmit = async (e) => {
        e.preventDefault()
        if (user.id === album.artist_id) {
            let albumName = {
                title,
                albumId
            }

            let res = await dispatch(thunkChangeAlbum(albumName))
            if (res) {
                closeModal()
                alert('Album\'s name was updated')
            } else if (!user) {
                setErrors(res)
            } else {
                await dispatch(thunkAllAlbums())
                    .then(() => refresh())
                    .then(() => {
                        closeModal();
                    })
            }
        } else {
            return alert('You must be the creator of an album to edit it')
        }
    }

    return (
        <>
            {errors.error && <p>{errors.error}</p>}
            {!user && <p>Must be logged in to create an album</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    disabled={!user}
                >
                    Change Album Name
                </button>
            </form>
        </>
    );
}

export default AlbumNameFormModal;
