import { useSelector } from "react-redux";
import SongTile from "../SongTile";
import "./manage-songs.css";

function ManageSongs() {
    const user = useSelector(state => state.session.user)
    const userSongs = useSelector(state => {
        const songs = Object.values(state.songs.all)
        return songs.filter(song => song.artist_id === user.id)
    })

    return (
        <div className="content">
            <div className="content-header">
                <h1>Manage Songs</h1>
            </div>
            <div className="container-song-tile">
                {userSongs.map((song, i) => (
                    <SongTile
                        song={song}
                        number={i+1}
                        key={`song${song.id}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default ManageSongs;
