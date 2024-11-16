import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateSong } from "../../redux/songs"
import { useModal } from "../../context/Modal";

function UpdateSongModal({ id }) {
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = async e => {
        e.preventDefault()

        const songData = {
            id,
            title,
            genre,
        }

        const res = await dispatch(updateSong(songData))
            .catch((err) => {
                setErrors({...err})
                console.log(err)
            })

        if (!Object.values(errors).length) closeModal()
    }

    return (
        <div>
            <h2>Update Your Song</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateSongModal;