import { CiCirclePlus } from "react-icons/ci";

function AlbumSongTile({ song, number }) {
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
            </div>
        </div>
    )
}

export default AlbumSongTile;
