import { useDispatch } from "react-redux"
import { getOneSong } from "../../redux/songs"
import "./song.css"

function Song({ song }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getOneSong(song.id))
    }

    return (
        <div>
            <button onClick={handleClick}>Play</button>
        </div>
    )
}

export default Song;
