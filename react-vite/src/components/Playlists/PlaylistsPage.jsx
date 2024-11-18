import PlaylistTile from "./PlaylistTile";
import * as playlistActions from "../../redux/playlists"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./playlistSongsPage.css"

function PlaylistPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const playlists = useSelector(state => state.playlists.allPlaylists)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(playlistActions.fetchUserPlaylists())

    }, [dispatch])
    // console.log("DONE FETCHING", playlists)

    const handlePlaylistClick = (playlistId) => {
        dispatch(playlistActions.fetchPlaylistById(playlistId));
        navigate(`/playlists/${playlistId}`);
    };

    const handleDelete = (playlistId) => {

        dispatch(playlistActions.deletePlaylist(playlistId)).then(() => {

            dispatch(playlistActions.fetchUserPlaylists());
        }).catch((error) => {
            console.error("Error deleting playlist:", error);
        });
    };


    return (
        <div className={`playlists-container playlist-page`}>
          {user ? (
            Object.values(playlists).length > 0 ? (
              Object.values(playlists).map((playlist) => (
                <PlaylistTile
                  className="playlist-tile"
                  key={playlist.id}
                  id={playlist.id}
                  playlistId={playlist.id}
                  name={playlist.name}
                  user={user.username}
                  onClick={() => handlePlaylistClick(playlist.id)}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <p>No playlists found.</p>
            )
          ) : (
            <div className="login-prompt">
              <p>Please log in to see your playlists.</p>
            </div>
          )}
        </div>
      );
}

export default PlaylistPage;
