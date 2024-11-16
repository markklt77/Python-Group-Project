import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkAllAlbums, thunkMakeAlbum } from "../../redux/albums";
import { useNavigate } from "react-router-dom";

function AlbumFormModal({ refresh, addSong }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    // const [showForms, setShowForms] = useState(false)
    // const [disabled, setDisabled] = useState(false)
    const user = useSelector(state => state.session.user)
    let navigate = useNavigate()
    // console.log(user.id)
    let albums = useSelector(state => state.albums.all)




    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkMakeAlbum({
                title,
                id: user.id
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
            console.log('errors', serverResponse)
            // alert(errors)
        } else if (!user) {
            errors.user = 'Must be logged in to create an album'
        } else {
            // console.log('the good stuff',serverResponse)
            await dispatch(thunkAllAlbums())
            const albumArray = Object.values(albums);
            const newAlbum = albumArray[albumArray.length - 1];
            if (newAlbum) {
                // console.log("New Album", newAlbum);
                addSong(newAlbum);
                refresh();
                closeModal();
            }
        }
    }

        return (
            <>

                {/* {showForms && album && (
                <div>
                    <OpenModalMenuItem
                        itemText='Create Album'
                        onItemClick={closeForm}
                        modalComponent={<AlbumAddSongModal />}
                    />
                </div>
            )} */}
                <h1>Create Album</h1>
                {errors.title && <p>{errors.title}</p>}
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
                        Create Album
                    </button>
                </form>
            </>
        );
    }

    export default AlbumFormModal;
