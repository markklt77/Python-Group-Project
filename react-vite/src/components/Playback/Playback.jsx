import { useSelector } from "react-redux";
import "./playback.css"

function Playback() {
    const selectedSong = useSelector(state => state.songs.current)
    const url = selectedSong?.url

    return (
        <div className="footer">
            <figure>
                <audio controls src={url}></audio>
            </figure>
        </div>
    )
}

export default Playback;
