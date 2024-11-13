import "./song-tile.css"

function SongTile({ song, number }) {
    const date = new Date(song.created_at)
    return (
        <div className="song-tile">
            <p>{number}</p>
            <p>{song.title}</p>
            <p>{song.album.title}</p>
            <p>{date.getMonth()}</p>
        </div>
    )
}

export default SongTile;
