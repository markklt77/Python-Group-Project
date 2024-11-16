import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PlaylistSong.css";

function PlaylistSongModal() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Add Song to Playlist</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <select>
          <option value="placeholder">Placeholder</option>
          <option value="placeholder">Placeholder</option>
          <option value="placeholder">Placeholder</option>
        </select>
        <span>
        <button type="cancel" onClick={closeModal}>Cancel</button>
        <button type="submit">Confirm</button>
        </span>
      </form>
    </>
  );
}

export default PlaylistSongModal;
