import { CiCirclePlus } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "./song-tile.css"

function SongTile({ song, number }) {
    const date = new Date(song.created_at)
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const month = months[date.getMonth()]

    return (
        <div className="song-tile">
            <p id="num">{number}</p>
            <p>{song.title}</p>
            <p>{song.album.title}</p>
            <p>
                {`${month} ${date.getDay()}, ${date.getFullYear()}`}
            </p>
            <div className="plus-button">
                <CiCirclePlus />
                <FaHeart className="like-button"/>
                <span className="likes-count">likes</span>
            </div>
            
        </div>
    )
}

export default SongTile;
