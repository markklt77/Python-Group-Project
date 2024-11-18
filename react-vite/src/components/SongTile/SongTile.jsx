import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { likeSong, unlikeSong } from "../../redux/likes";
import PlusButton from "../PlusButton"
// import { CiCirclePlus } from "react-icons/ci";
import { IoTrashSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoPlaySharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { getCurrentSong, deleteSong, getAllSongs } from "../../redux/songs";
import PlaylistSongModal from "../PlaylistSongModal/PlaylistSongModal";
import { removeSongFromPlaylist } from "../../redux/playlists";
import OpenModalButton from "../OpenModalButton"
import UpdateSongModal from "../SongFormModal/UpdateSongModal"
import DeleteSong from '../Albums/AlbumDeleteSong/AlbumDeleteSongModal'
import AlbumDeleteQuestion from '../Albums/AlbumDeleteSong/AlbumDeleteQuestion'
import "./song-tile.css";
import { thunkOneAlbum, thunkRemoveSong } from "../../redux/albums";


function SongTile({ song, number }) {
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [hovered, setHovered] = useState(false)
    // const [managePlaylist, setManagePlaylist] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const [errors, setErrors] = useState({})
    const { playlistId } = useParams()
    let { albumId } = useParams()
    let album = useSelector(state => state.albums.all[albumId])


    // format month
    const date = new Date(song.created_at)
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const month = months[date.getMonth()]


    let count = useSelector(state => state.songs.all[song.id].likes)
    let likesAmount = count.length
    let user = useSelector(state => state.session.user)
    let currentUserId
    if (user) {
        currentUserId = user.id
    }
    // console.log(count)

    const currentlyLiked = count.some(like => like.artist_id === currentUserId)

    // console.log(currentlyLiked)


    useEffect(() => {
        // reference to SongTile
        const tiles = document.getElementsByClassName("song-tile")
        const tile = tiles[number - 1]

        tile.addEventListener("mouseenter", () => {
            setHovered(true)
        })

        tile.addEventListener("mouseleave", () => {
            setHovered(false)
        })

        setLikesCount(likesAmount)
        setLiked(currentlyLiked)



    }, [number, likesAmount, currentlyLiked])

    // console.log(location.pathname)



    const handleLike = async (e) => {
        e.preventDefault();

        // const errors = {};

        await dispatch(likeSong(song.id))
            .then(setLiked(true))
            .then(setLikesCount(likesCount => likesCount + 1))
        return await dispatch(getAllSongs())
    }

    const handleUnlike = async (e) => {
        e.preventDefault();

        // const errors = {};

        await dispatch(unlikeSong(song.id))
            .then(setLiked(false))
            .then(setLikesCount(likesCount => likesCount - 1))

        return await dispatch(getAllSongs())

    }

    const handleClick = () => {
        dispatch(getCurrentSong(song.id))
    }

    const removeSongPlaylist = async (e) => {
        e.preventDefault();

        // const errors = {};

        // console.log(parseInt(playlistId), number)

        await dispatch(removeSongFromPlaylist(parseInt(playlistId), song.id))


    }

    const deleteASong = async e => {
        e.preventDefault();

        await dispatch(deleteSong(song.id))
    }


    //from AlbumSong
    let handleDeleteSong = async (songId) => {
        let songInfo = {
            songId,
            albumId: Number(albumId)
        }
        let serverResponse = await dispatch(thunkRemoveSong(songInfo))

        if (serverResponse.message) {
            await dispatch(thunkOneAlbum(albumId)).then(() => {
                alert(serverResponse.message)
            })


        } else {
            setErrors(serverResponse)
            alert(errors.error)
        }
    }

    return (
        <div className="song-tile" key={`song${song.id}`}>
            {hovered ?
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
            {!location.pathname.includes('albums') && (
                <p>{song.album.title}</p>
            )}

            <p>
                {`${month} ${date.getDay()}, ${date.getFullYear()}`}
            </p>
            <div className="actions">
                <PlusButton
                    modalComponent={<PlaylistSongModal id={song.id} />}
                />
                <FaHeart className="like-button" onClick={!liked ? handleLike : handleUnlike} style={liked ? { color: "#4e53ae" } : ''} />
                <span className="likes-count">{likesCount}</span>
                {location.pathname.includes("playlists") ? < IoTrashSharp onClick={removeSongPlaylist} className="delete-button" /> : ''}
                {location.pathname.includes("manage-songs") ?
                    <>
                        <OpenModalButton
                            buttonText={<MdEdit />}
                            modalComponent={<UpdateSongModal id={song.id} />}
                            addClass="edit-button"
                        />
                        <IoTrashSharp onClick={deleteASong} />
                    </> : ''}
                {location.pathname.includes('albums') && user && user.id === album.artist_id && (
                    <DeleteSong
                        modalComponent={<AlbumDeleteQuestion song={song} handleDeleteSong={handleDeleteSong} />} />
                )}
            </div>

        </div>
    )
}

export default SongTile;
