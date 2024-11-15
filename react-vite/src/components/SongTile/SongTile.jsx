import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeSong, unlikeSong } from "../../redux/likes";
import { CiCirclePlus } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "./song-tile.css"

function SongTile({ song, number }) {
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const dispatch = useDispatch()

    const date = new Date(song.created_at)
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const month = months[date.getMonth()]

    console.log(song.likes.length)
    
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
                <FaHeart className="like-button" onClick={ !liked ? handleLike : handleUnlike} style={ liked ? {color: "rgb(54, 58, 121)"} : ''}/>
                <span className="likes-count">{likesCount}</span>
            </div>
            
        </div>
    )
}

export default SongTile;
