import { useDispatch } from 'react-redux';
import { useState } from "react"
import * as playlistActions from '../../redux/playlists'
import { useModal } from "../../context/Modal";

function CreatePlaylistForm() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Playlist name is required.');
      return;
    }

    const playlistData = {
      name,
    };

    dispatch(playlistActions.createNewPlaylist(playlistData));
    setName('');
    setError('');
    closeModal();
  };

  return (
    <form className="playlist-create-form" onSubmit={handleSubmit}>
      <label className="playlist-name-field" htmlFor="name">Playlist Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Create Playlist</button>
    </form>
  );
}

export default CreatePlaylistForm;
