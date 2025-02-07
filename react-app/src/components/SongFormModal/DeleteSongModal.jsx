import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSong } from "../../redux/songs";

function DeleteSongModal({ song }) {
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const deleteASong = async e => {
        e.preventDefault();

        const deleted = await dispatch(deleteSong(song.id))
            .catch(err => err.json())

        if (!deleted.errors) closeModal
        else setErrors({ errors: deleted.errors})
    }

    return (
        <>
            {Object.entries(errors).length > 0 &&
                Object.entries(errors).map(err => (
                    <p className="errors">{err[1]}</p>
                ))
            }
            <p>Delete Song?</p>
            <button onClick={deleteASong}>Yes</button>
            <button onClick={closeModal}>No</button>
        </>
    )
}

export default DeleteSongModal;
