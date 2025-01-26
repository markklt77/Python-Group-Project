import { IoTrashSharp } from "react-icons/io5";


function PlaylistTile({user, name, playlistId, onClick, handleDelete}) {

    return (
        <div
        className="playlist-tile"
        onClick={onClick}>
            <div className="top-part">
                <h4>{name}</h4>
                <div>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(playlistId);
                    }} className="delete-button-playlist">
                        <IoTrashSharp />
                    </button>
                </div>

            </div>
            <p>Playlist . {user}</p>
        </div>
    )
}

export default PlaylistTile;
