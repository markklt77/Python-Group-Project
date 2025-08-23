import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addSongToPlaylist } from "../../redux/playlists";
import "./PlaylistSong.css";

function PlaylistSongModal({ id, userMessage }) {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [playlistId, setPlaylistId] = useState("")
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const playlists = useSelector(state => state.playlists.allPlaylists)
  // console.log(Object.values(playlists))

  useEffect(() => {
    if (user === null) {
      setMessage(userMessage)
    } else if (Object.keys(playlists) > 0) {
      // console.log(Object.values(playlists))
      setPlaylistId(Object.values(playlists)[0].id);
      setMessage('')
    } else if (Object.keys(playlists) < 1) {
      setMessage('No playlist to add to, create one to start adding songs')
    }
  }, [playlists, user, userMessage]);


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
      {message ? (
        <div id='no-user-message'>

          {message}

        </div>
      ) : (
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
      )}

    </div>
  );
}

export default PlaylistSongModal;
