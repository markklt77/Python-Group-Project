import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { thunkMakeAlbum } from "../../redux/albums";

function AlbumFormModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)

    // console.log(user.id)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const serverResponse = await dispatch(
        //     thunkMakeAlbum({
        //         title,
        //         id: user.id
        //     })
        // );

        // if (serverResponse) {
        //     setErrors(serverResponse);
        //     // console.log('errors',errors)
        //     // alert(errors)
        // } else {
        //     closeModal();
        // }
    };

    // console.log(errors)

    return (
        <>
            <h1>Create Album</h1>
            {/* {errors.server && <p>{errors.server}</p>} */}
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
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default AlbumFormModal;
