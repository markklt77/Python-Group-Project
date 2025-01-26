

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { likeSong, unlikeSong } from "../../redux/likes";
// import PlusButton from "../PlusButton"
// import DeleteSong from "./AlbumDeleteSong/AlbumDeleteSongModal";
// import { FaHeart } from "react-icons/fa";
// import { getOneSong } from "../../redux/songs";
// import { IoPlaySharp } from "react-icons/io5";
// import { thunkRemoveSong, thunkOneAlbum } from '../../redux/albums'
// import PlaylistSongModal from "../PlaylistSongModal/PlaylistSongModal";
// import { useParams } from "react-router-dom";
// import AlbumDeleteQuestion from "./AlbumDeleteSong/AlbumDeleteQuestion";

// function AlbumSongs({ song, number, refreshSong }) {
//     const [liked, setLiked] = useState(false)
//     const [likesCount, setLikesCount] = useState(0)
//     const [hovered, setHovered] = useState(false)
//     const [errors, setErrors] = useState({})
//     const dispatch = useDispatch()
//     let { albumId } = useParams()
//     let album = useSelector(state => state.albums.all[albumId])
//     let user = useSelector(state => state.session.user)


//     let handleDeleteSong = async (songId) => {
//         let songInfo = {
//             songId,
//             albumId: Number(albumId)
//         }
//         let serverResponse = await dispatch(thunkRemoveSong(songInfo))

//         if (serverResponse.message) {
//             await dispatch(thunkOneAlbum(albumId)).then(() => {
//                 alert(serverResponse.message)
//             })


//         } else {
//             setErrors(serverResponse)
//             alert(errors.error)
//         }
//     }

//     let count = useSelector(state => state.songs.all[song.id].likes)
//     let likesAmount = count.length
//     let currentUserId
//     if (user) {
//         currentUserId = user.id
//     }
//     const currentlyLiked = count.some(like => like.artist_id === currentUserId)



//     // format month
//     const date = new Date(song.created_at)
//     const months = [
//         "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ]
//     const month = months[date.getMonth()]


//     useEffect(() => {
//         // reference to SongTile
//         const tiles = document.getElementsByClassName("song-tile-album")
//         const tile = tiles[number - 1]

//         tile.addEventListener("mouseenter", () => {
//             setHovered(true)
//         })

//         tile.addEventListener("mouseleave", () => {
//             setHovered(false)
//         })

//         setLikesCount(likesAmount)
//         setLiked(currentlyLiked)
//     }, [number, likesAmount, currentlyLiked])


//     // console.log(song.likes.length)

//     const handleLike = async (e) => {
//         e.preventDefault();

//         // const errors = {};

//         return await dispatch(likeSong(number))
//             .then(setLiked(true))
//             .then(setLikesCount(likesCount => likesCount + 1))
//             .then(() => refreshSong())
//     }

//     const handleUnlike = async (e) => {
//         e.preventDefault();

//         // const errors = {};

//         return await dispatch(unlikeSong(number))
//             .then(setLiked(false))
//             .then(setLikesCount(likesCount => likesCount - 1))
//             .then(() => refreshSong())
//     }

//     const handleClick = () => {
//         dispatch(getOneSong(song.id))
//     }

//     return (
//         <div className="song-tile-album" key={`song${song.id}`}>
//             {hovered ?
//                 <div id="play-button-container" >
//                     <button
//                         onClick={handleClick}
//                         className="play-button"
//                     >
//                         <IoPlaySharp />
//                     </button>
//                 </div> :
//                 <p id="num">{number}</p>
//             }
//             <p>{song.title}</p>
//             <p className="date-song-tile-album">
//                 {`${month} ${date.getDay()}, ${date.getFullYear()}`}
//             </p>
//             <div className="actions-albums">
//                 <PlusButton
//                     modalComponent={<PlaylistSongModal />}
//                 />
//                 <FaHeart className="like-button" onClick={!liked ? handleLike : handleUnlike} style={liked ? { color: "rgb(54, 58, 121)" } : ''} />
//                 <span className="likes-count">{likesCount}</span>
//                 {user && user.id === album.artist_id && (
//                     <DeleteSong
//                         modalComponent={<AlbumDeleteQuestion song={song} handleDeleteSong={handleDeleteSong} />} />
//                 )}

//             </div>

//         </div>
//     )
// }

// export default AlbumSongs;
