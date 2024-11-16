import { useState } from "react";
import { useDispatch } from "react-redux"
import { uploadSong } from "../../redux/songs";
import { useModal } from "../../context/Modal";
import "./song-form.css"

function SongFormModal() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file)
        formData.append("title", title)
        formData.append("genre", genre)

        // May want to set a Loading Image

        const res = await dispatch(uploadSong(formData))
            .then(res => res.json())
            .catch(err => {
                setErrors({...err})
                return err
            })

        console.log(res)

        if (!Object.values(errors).length) closeModal()
    }

    return (
        <div className="song-modal">
            <h2>Upload A New Song</h2>

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <p>
                    { Object.values(errors).length?
                        Object.values(errors).forEach(err => (
                            <>{ err }</>
                        )) :
                        ""
                    }
                </p>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                    required
                />

                <input
                    type="file"
                    accept=".mp3,.wav,.flac,.aac"
                    onChange={e => setFile(e.target.files[0])}
                    required
                />

                <button type="submit">Upload Song</button>
            </form>
        </div>
    )
}

export default SongFormModal;
