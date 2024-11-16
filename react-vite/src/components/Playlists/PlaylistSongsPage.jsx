import SongTile from "../SongTile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PlaylistSongsPage() {
    const playlist = useSelector(state => state.playlists.currentPlaylist);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait for the playlist and its songs to be fully populated
        if (playlist && playlist.songs) {
            setLoading(false);
        }
    }, [playlist]);

    if (loading || !playlist.songs) {
        return <p>Loading playlist...</p>;
    }


    return (
        <div className="playlist-songs-container">
            {playlist.songs ? (
                <>
                    <h2>{playlist.name}</h2>
                    <div className="songs-list">
                        {playlist.songs.length > 0 ? (
                            playlist.songs.map((song, index) => (
                                <SongTile
                                    key={song.id}
                                    song={song}
                                    number={index + 1}
                                />
                            ))
                        ) : (
                            <p>No songs in this playlist.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PlaylistSongsPage
