import { useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import "./playback.css"

function Playback() {
    const selectedSong = useSelector(state => state.songs.current)
    const url = selectedSong?.url

    return (
        <div className="footer">
            <div className="display-song">
                <h3>{selectedSong.title}</h3>

                <div className="plus-button">
                    <CiCirclePlus />
                </div>
            </div>

            <figure className="audio-playback">
                <audio
                    controls
                    src={url}
                    autoPlay
                ></audio>
            </figure>
        </div>
    )
}

export default Playback;
