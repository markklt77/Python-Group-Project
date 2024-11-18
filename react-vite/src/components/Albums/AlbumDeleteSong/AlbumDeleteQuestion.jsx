import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

function AlbumDeleteQuestion({ handleDeleteSong, song }) {
    // const dispatch = useDispatch();
    const [deleteSong, setDeleteSong] = useState()
    // const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (deleteSong === true) {
            // console.log(song)
            handleDeleteSong(song.id)
        }
            closeModal()

    };







    return (
        <>
            {/* {errors.server && <p>{errors.server}</p>} */}
            <form onSubmit={handleSubmit}>
                <h3>Would you like to delete your song from you album</h3>

                <div>
                    <input  type="radio" checked={deleteSong === true} onChange={()=>setDeleteSong(true)}/>
                    <label style={{color:'white'}}>Yes, delete the song</label>
                </div>

                <span>
                    <input type="radio" checked={deleteSong === false} onChange={()=>setDeleteSong(false)} />
                    <label style={{color:'white'}}>No, do not delete the song</label>
                </span>
                <div>
                    <button type='submit'>Submit</button>
                </div>

            </form>
        </>
    );
}

export default AlbumDeleteQuestion;
