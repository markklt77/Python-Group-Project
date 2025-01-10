import { useSelector } from "react-redux";
import SongTile from "../SongTile";
import "./home.css";

function Home() {
    const allSongsFlat = useSelector(state => state.songs.all)
    const arrSongs = Object.values(allSongsFlat)

    return (
        <div className="content">
            <div className="content-header">
                <h1>All Songs</h1>
            </div>
            <div className="song-labels">
                <p id="num">#</p>
                <p>Title</p>
                <p>Album</p>
                <p>Date Added</p>
            </div>
            <div className="container-song-tile">
                {arrSongs.map((song, i) => (
                    <SongTile
                        song={song}
                        number={i + 1}
                        key={`song${song.id}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;
