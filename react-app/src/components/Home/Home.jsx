import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkAllAlbums } from "../../redux/albums"
import { useLoading } from "../../context/LoadingContext";
import SongTile from "../SongTile";
import "./home.css";

function Home() {
    const { setIsLoading } = useLoading()
    const allSongsFlat = useSelector(state => state.songs.all)
    const arrSongs = Object.values(allSongsFlat)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkAllAlbums())
            .then(() => setIsLoading(false))
    }, [dispatch, setIsLoading]);

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
