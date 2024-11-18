import SongTile from "../SongTile";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PlaylistSongsPage() {
    const playlist = useSelector(state => state.playlists.currentPlaylist);


    if (!playlist) {
        // Return a loading state or an empty state if playlist is not available
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
