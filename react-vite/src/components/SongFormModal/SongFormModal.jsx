import { useState } from "react";
import { useDispatch } from "react-redux"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { uploadSong } from "../../redux/songs";
import { useModal } from "../../context/Modal";
import "./song-form.css"

function SongFormModal() {
    const [isLoading, setIsLoading] = useState(false);
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

        setIsLoading(true)

        const validate = {};

        const res = await dispatch(uploadSong(formData))
            .then(res => res.json())
            .then(() => closeModal())
        // .catch(err => {
        //     validate = {...err}
        //     return err
        // })


        if (res.file.length) {
            validate.file = res.file[0]
            setErrors(validate)
        }

        if (!Object.values(validate).length) closeModal()
        else setIsLoading(false)
    }

    return (
        <div className="song-modal">
            <div className="modal-head">
                <h2>Upload A New Song</h2>
                {isLoading && <AiOutlineLoading3Quarters style={{color: "white"}}/>}
                <p className="errors">
                    {errors.file ? errors.file :
                        ""
                    }
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="form-modal"
            >
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

                <button
                    type="submit"
                    className="filter-buttons"
                    disabled={isLoading}>Upload Song</button>

            </form>
        </div>
    )
}

export default SongFormModal;
