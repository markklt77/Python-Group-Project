import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function AlbumFormModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const serverResponse = await dispatch(
        //   thunkSignup({
        //     email,
        //     username,
        //     password,
        //   })
        // );

        // if (serverResponse) {
        //   setErrors(serverResponse);
        // } else {
        //   closeModal();
        // }
    };

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
