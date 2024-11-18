import { useSelector } from "react-redux";
import SongTile from "../SongTile";
import "./home.css";
// import { useEffect, useState } from "react";
// import { getAllSongs } from "../../redux/songs";

function Home() {
    const allSongsFlat = useSelector(state => state.songs.all)
    const arrSongs = Object.values(allSongsFlat)
    // const [refreshed, setRefreshed] = useState(0)
    // let dispatch = useDispatch()


    // let refresh = () => {
    //     setRefreshed(prev => prev + 1)
    // }



    // useEffect(() => {
    //     dispatch(getAllSongs())
    // }, [dispatch, refreshed])

    return (
        <div className="content">
            <div className="content-header">
                <h1>All Songs</h1>
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
