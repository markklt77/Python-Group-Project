// import { getAllSongs } from "../../redux/songs";
import { useEffect } from "react";
import SongTile from "../SongTile";
import { useSelector, useDispatch } from "react-redux";
// import { getAllSongs } from "../../redux/songs";
import { useParams } from "react-router-dom";
import { fetchPlaylistById } from "../../redux/playlists";


function PlaylistSongsPage() {
    const playlist = useSelector(state => state.playlists.currentPlaylist);
    const { playlistId } = useParams();
    let dispatch = useDispatch();


    useEffect(() => {
        if (playlistId) {
            dispatch(fetchPlaylistById(playlistId));
        }
    }, [dispatch, playlistId])


    if (!playlist) {

        return <p>Loading playlist...</p>;
    }



    return (
        <div className="content">
            <div className="content-header">
                <h1>{playlist.name}</h1>
            </div>

            <div className="songs-list">
                {playlist.songs.length > 0 ? (
                    playlist.songs.map((song, index) => {
                        if (!song || !song.id || !song.created_at) {
                            return <p key={`loading-${index}`}>...Loading</p>;
                        }
                        return (
                            <SongTile
                                key={song.id}
                                song={song}
                                number={index + 1}
                            />
                        );
                    })
                ) : (
                    <p>No songs in this playlist.</p>
                )}
            </div>
        </div>
    );
}


export default PlaylistSongsPage
