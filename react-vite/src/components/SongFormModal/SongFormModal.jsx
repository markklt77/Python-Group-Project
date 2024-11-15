import { useState } from "react";
import { useDispatch } from "react-redux"
import { uploadSong } from "../../redux/songs";
import "./song-form.css"

function SongFormModal() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault();

        const song = {
            title,
            genre,
            file
        }

        const res = dispatch(uploadSong(song))
            .catch((err) => {
                setErrors({err})
            })

        // if (!Object.values(errors).length) return
    }

    const handleChange = e => {
        setFile(e.target.files[0])
    }

    return (
        <div className="song-modal">
            <h2>Upload A New Song</h2>

            <form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                    required
                />

                <button type="submit">Upload Song</button>
            </form>
        </div>
    )
}

export default SongFormModal;
