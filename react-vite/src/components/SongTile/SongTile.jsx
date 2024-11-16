import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likeSong, unlikeSong } from "../../redux/likes";
import { CiCirclePlus } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { getOneSong } from "../../redux/songs";
import { IoPlaySharp } from "react-icons/io5";
import "./song-tile.css";

function SongTile({ song, number }) {
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [hovered, setHovered] = useState(false)
    const dispatch = useDispatch()

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

    // console.log(song.likes.length)

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
            <div className="plus-button">
                <CiCirclePlus />
                <FaHeart className="like-button" onClick={ !liked ? handleLike : handleUnlike} style={ liked ? {color: "rgb(54, 58, 121)"} : ''}/>
                <span className="likes-count">{likesCount}</span>
            </div>

        </div>
    )
}

export default SongTile;
