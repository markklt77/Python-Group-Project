import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addSongToPlaylist } from "../../redux/playlists";
import "./PlaylistSong.css";

function PlaylistSongModal({id}) {
  const dispatch = useDispatch();
  const [playlistId, setPlaylistId] = useState()
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const playlists = useSelector(state => state.playlists.allPlaylists)
  // console.log(playlists)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(id, playlistId)
    const addSong = await dispatch(addSongToPlaylist(playlistId, id))

    if (addSong) {
      setErrors(addSong);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h2>Add Song to Playlist</h2>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <select value={playlistId} onChange={(e) => setPlaylistId(e.target.value)}>
          {Object.values(playlists).map((playlist) => (
          <option key={playlist.id} value={playlist.id} >{playlist.name}</option>
        ))}
        </select>
        <span>
        <button type="cancel" onClick={closeModal}>Cancel</button>
        <button type="submit" onClick={handleSubmit}>Confirm</button>
        </span>
      </form>
    </>
  );
}

export default PlaylistSongModal;
