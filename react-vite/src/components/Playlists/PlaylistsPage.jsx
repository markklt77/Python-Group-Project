import PlaylistTile from "./PlaylistTile";
import * as playlistActions from "../../redux/playlists"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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


    return (
        <div className="playlists-container">
            {Object.values(playlists).length > 0 ? (
                Object.values(playlists).map((playlist) => (
                    <PlaylistTile
                        className="playlist-tile"
                        key={playlist.id}
                        id={playlist.id}
                        name={playlist.name}
                        user={user ? user.username : "Loading User"}
                        onClick={() => handlePlaylistClick(playlist.id)}
                    />
                ))
            ) : (
                <p>No playlists found.</p>
            )}
        </div>
    );
}

export default PlaylistPage;
