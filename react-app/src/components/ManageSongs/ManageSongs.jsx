import { useSelector } from "react-redux";
import SongTile from "../SongTile";
import "./manage-songs.css";

function ManageSongs() {
    const user = useSelector(state => state.session.user)
    const userSongs = useSelector(state => state.songs.all)
    const songs = Object.values(userSongs).filter(song => song.artist_id === user.id)

    return (
        <div className="content">
            <div className="content-header">
                <h1>Manage Songs</h1>
            </div>
            <div className="song-labels">
                <p id="num">#</p>
                <p>Title</p>
                <p>Album</p>
                <p>Date Added</p>
            </div>
            <div className="container-song-tile">
                {songs.map((song, i) => (
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
