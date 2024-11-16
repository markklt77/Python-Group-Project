import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { likeSong, unlikeSong } from "../../redux/likes";
import PlusButton from "../PlusButton"
// import { CiCirclePlus } from "react-icons/ci";
import { IoTrashSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { getOneSong } from "../../redux/songs";
import { IoPlaySharp } from "react-icons/io5";
import "./song-tile.css";
import PlaylistSongModal from "../PlaylistSongModal/PlaylistSongModal";
import { removeSongFromPlaylist } from "../../redux/playlists";


function SongTile({ song, number }) {
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [managePlaylist, setManagePlaylist] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const { playlistId } = useParams()


    // format month
    const date = new Date(song.created_at)
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const month = months[date.getMonth()]


    useEffect(() => {
        // reference to SongTile
        const tiles = document.getElementsByClassName("song-tile")
        const tile = tiles[number-1]

        tile.addEventListener("mouseenter", () => {
            setHovered(true)
        })

        tile.addEventListener("mouseleave", () => {
            setHovered(false)
        })
    })

    console.log(location.pathname)

   

    const handleLike = async (e) => {
        e.preventDefault();

        const errors = {};

        const newLike = await dispatch(likeSong(number))
        .then(setLiked(true))
        .then(setLikesCount(likesCount => likesCount + 1))
    }

    const handleUnlike = async (e) => {
        e.preventDefault();

        const errors = {};

        const unlike = await dispatch(unlikeSong(number))
        .then(setLiked(false))
        .then(setLikesCount(likesCount => likesCount - 1))
    }

    const handleClick = () => {
        dispatch(getOneSong(song.id))
    }

    const removeSongPlaylist = async (e) => {
        e.preventDefault();

        const errors = {};

        // console.log(parseInt(playlistId), number)
        const removeSong = await dispatch(removeSongFromPlaylist(parseInt(playlistId), number))
    }

    return (
        <div className="song-tile" key={`song${song.id}`}>
            { hovered?
                <div id="play-button-container" >
                    <button
                        onClick={handleClick}
                        className="play-button"
                    >
                        <IoPlaySharp />
                    </button>
                </div> :
                <p id="num">{number}</p>
            }
            <p>{song.title}</p>
            <p>{song.album.title}</p>
            <p>
                {`${month} ${date.getDay()}, ${date.getFullYear()}`}
            </p>
            <div className="actions">
                <PlusButton 
                modalComponent={<PlaylistSongModal id={song.id}/>}
                />
                <FaHeart className="like-button" onClick={ !liked ? handleLike : handleUnlike} style={ liked ? {color: "rgb(54, 58, 121)"} : ''} />
                <span className="likes-count">{likesCount}</span>
                {location.pathname.includes("playlists") ? < IoTrashSharp onClick={removeSongPlaylist}/> : ''}
            </div>

        </div>
    )
}

export default SongTile;
