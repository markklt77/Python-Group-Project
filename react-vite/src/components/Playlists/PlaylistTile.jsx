import { IoTrashSharp } from "react-icons/io5";


function PlaylistTile({user, name, playlistId, onClick, handleDelete}) {

    return (
        <div
        className="playlist-tile"
        onClick={onClick}>
            <h4>{name}</h4>
            <p>Playlist . {user}</p>
            <button onClick={(e) => {
                e.stopPropagation();
                handleDelete(playlistId);
            }} className="delete-button">
                <IoTrashSharp />
            </button>
        </div>
    )
}

export default PlaylistTile;
