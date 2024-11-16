

function PlaylistTile({user, name, onClick}) {
    return (
        <div
        className="playlist-tile"
        onClick={onClick}>
            <h4>{name}</h4>
            <p>Playlist . {user}</p>
        </div>
    )
}

export default PlaylistTile;
