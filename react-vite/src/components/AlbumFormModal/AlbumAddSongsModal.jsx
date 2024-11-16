import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { thunkAllAlbums, thunkMakeAlbum } from "../../redux/albums";
import { useNavigate } from "react-router-dom";
import AlbumSongTile from "../Albums/AlbumSongTile";

function AlbumAddSongModal({ newAlbum }) {
    const dispatch = useDispatch();
    // const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    // const [showForms, setShowForms] = useState(false)
    // const [disabled, setDisabled] = useState(false)
    const user = useSelector(state => state.session.user)
    let navigate = useNavigate()
    // console.log(user.id)
    const allSongsFlat = useSelector(state => state.songs.all)
    const arrSongs = Object.values(allSongsFlat)
    const ownerSongs = arrSongs.filter(song => {
        return song.artist_id == user.id
    })
    let albums = useSelector(state => state.albums.all)

    // console.log('from the modal', ownerSongs)
    let selected = []


    const handleSubmit = async (e) => {
        e.preventDefault();

        // const serverResponse = await dispatch(
        //     thunkMakeAlbum({
        //         title,
        //         id: user.id
        //     })
        // );

        // if (serverResponse) {
        //     setErrors(serverResponse);
        //     console.log('errors', serverResponse)
        //     // alert(errors)
        // } else if (!user) {
        //     errors.user = 'Must be logged in to create an album'
        // } else {
        //     // console.log('the good stuff',serverResponse)
        //     await dispatch(thunkAllAlbums())
        //         // .then(() => refresh())
        //         // .then(() => addSong())
        //         .then(() => closeModal())
        //         .then(() => {
        //             let album = Object.values(albums)
        //             return album[album.length - 1]
        //         })
        //         // .then((album)=> console.log(album.id))
        //         .then((album) => navigate(`/albums/${album.id}/add-songs`))
        //     // .then(() => setShowForms(true))
        // }
    };

    // const toggleAddSongs = (e) => {
    //     e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    //     setShowForms(!showForms);
    // };


    // useEffect(() => {
    //     if (!showForms) return;

    //     const closeForm = (e) => {
    //         if (ulRef.current && !ulRef.current.contains(e.target)) {
    //             setShowForms(false);
    //         }
    //     };

    //     document.addEventListener('click', closeForm);

    //     return () => document.removeEventListener('click', closeForm)
    // }, [showForms])

    // const closeForm = () => setShowForms(false)

    const addSong = (song) => {
        console.log(song)
        selected.push(song)
    }

    // console.log(selected)

    return (
        <>
            <h1>Add songs to new Album</h1>
            {errors.title && <p>{errors.title}</p>}
            {!user && <p>Must be logged in to create an album</p>}
            {ownerSongs.length > 0 && (
                <div>
                    <div className="content-header">
                        <h1>All Songs</h1>
                    </div>
                    <div className="container-song-tile">
                        {ownerSongs.map((song, i) => (
                            <AlbumSongTile
                                onClick={() => addSong(song)}
                                song={song}
                                number={i + 1}
                                key={`song${song.id}`}
                            />
                        ))}
                    </div>

                </div>

            )}
        </>
    );
}

export default AlbumAddSongModal;
