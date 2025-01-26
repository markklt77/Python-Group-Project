import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addSongToPlaylist } from "../../redux/playlists";
import "./PlaylistSong.css";

function PlaylistSongModal({id}) {
  const dispatch = useDispatch();
  const [playlistId, setPlaylistId] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const playlists = useSelector(state => state.playlists.allPlaylists)


  useEffect(() => {
    if (Object.keys(playlists)) {
      setPlaylistId(Object.values(playlists)[0].id);
    }
  }, [playlists]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const addSong = await dispatch(addSongToPlaylist(playlistId, id))

    if (addSong) {
      setErrors(addSong);
    } else {
      closeModal();
    }
  };

  return (
    <div className="playlist-song-modal">
      <div className="modal-head">
        <h2>Add Song to Playlist</h2>
      </div>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="form-modal">
        <select value={playlistId} onChange={(e) => setPlaylistId(e.target.value)}>
          {Object.values(playlists).map((playlist) => (
          <option key={playlist.id} value={playlist.id} >{playlist.name}</option>
        ))}
        </select>
        <div >
        <span className="button-container">
        <button type="cancel" onClick={closeModal} className="filter-buttons">Cancel</button>
        <button type="submit" onClick={handleSubmit} className="filter-buttons">Confirm</button>
        </span>
        </div>
      </form>
    </div>
  );
}

export default PlaylistSongModal;
