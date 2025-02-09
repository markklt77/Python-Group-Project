import { useSelector } from "react-redux";
import PlusButton from "../PlusButton";
import PlaylistSongModal from "../PlaylistSongModal/PlaylistSongModal";
import "./playback.css"
import Footer from "../../Footer/Footer";

function Playback() {
    const selectedSong = useSelector(state => state.songs.current)
    const url = selectedSong?.url

    return (
        <div className="footer">
            <div className="display-song">
                <h3>{selectedSong.title}</h3>

                <PlusButton
                    modalComponent={<PlaylistSongModal id={selectedSong.id} />}
                    setClass='plus-button'
                />
            </div>

            <figure className="audio-playback">
                <audio
                    controls
                    src={url}
                    autoPlay
                ></audio>
            </figure>

            <div>
                <Footer className='the-footer'/>
            </div>
        </div>
    )
}

export default Playback;
