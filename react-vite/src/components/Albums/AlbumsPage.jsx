// import AlbumSongs from './AlbumSongs';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkOneAlbum, thunkDeleteAlbum, thunkAllAlbums } from '../../redux/albums'
import AlbumNameFormModal from '../AlbumFormModal/AlbumNameFormModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import AlbumAddSongModal from '../AlbumFormModal/AlbumAddSongsModal';
import './albums.css'
import { getAllSongs } from '../../redux/songs';
import SongTile from '../SongTile'


function AlbumsPage() {
    let { albumId } = useParams()
    let dispatch = useDispatch()
    let albums = useSelector(state => state.albums.all)
    let album = useSelector(state => state.albums.all[albumId])
    let currAlbum = useSelector(state => state.albums.selected)
    let user = useSelector(state => state.session.user)
    let [isLoaded, setIsLoaded] = useState(false)
    const [showForms, setShowForms] = useState(false)
    const [addSong, setAddSong] = useState(false)
    const [changeName, setChangeName] = useState(false)
    let navigate = useNavigate()
    let albumSongs = Object.values(currAlbum)
    const [helpWithRefresh, setHelpWithRefresh] = useState(0)
    const ulRef = useRef()

    let refresh = () => {
        setHelpWithRefresh(prev => prev + 1)
    }

    useEffect(() => {
        dispatch(thunkAllAlbums()).then(() => setIsLoaded(true))
        dispatch(thunkOneAlbum(albumId))
        setChangeName(false)
        setAddSong(false)
        setShowForms(false)
    }, [dispatch, albumId, helpWithRefresh])

    let ownersAlbums

    if (user) {
        ownersAlbums = Object.values(albums).filter((album) => {
            return album.artist_id === user.id
        })
    }

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch, helpWithRefresh])


    // console.log(ownersAlbums)
    let handleDelete = () => {
        // console.log(user.id, album.artist_id)
        if (user.id === album.artist_id) {
            let res = dispatch(thunkDeleteAlbum(albumId))
            if (res) {

                dispatch(thunkDeleteAlbum(albumId))
                    .then(() => refresh())
                    .then(() => navigate('/'))
                    .then(() => alert('Album was deleted'))
            }
        } else {
            return alert('You must be the creator of an album to delete it')
        }
    }


    useEffect(() => {
        if (!showForms) return;

        const closeForm = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowForms(false);
            }
        };

        document.addEventListener("click", closeForm);

        return () => document.removeEventListener("click", closeForm);
    }, [showForms]);

    const closeForm = () => setShowForms(false)


    let handleClick = (id) => {
        dispatch(thunkOneAlbum(id)).then(() => navigate(`/albums/${id}`))
    };


    const addSongs = () => {
        setAddSong(true)
        setChangeName(false)
        if (showForms && addSong) {
            setShowForms(false)
        } else {
            setShowForms(true)
        }
    }

    const toggleNameChange = () => {
        // e.stopPropagation()
        setChangeName(true)
        setAddSong(false)
        if (showForms && changeName) {
            setShowForms(false)
        } else {
            setShowForms(true)
        }
    };
    const closeAddSong = () => {
        // e.stopPropagation()
        setAddSong(false)
        closeForm()
    }



    return (
        <div className="content">

            {albumId && album ? (
                <div>
                    <div className="content-header">
                        <div>
                            <h2 className='album-page-title'>List of songs for {album.title}</h2>
                            {user && user.id === album.artist_id && (
                                <span>
                                    <button
                                        className={'filter-buttons'}
                                        onClick={handleDelete}>Delete album</button>
                                    <button
                                        className={changeName ? 'filter-button-selected' : 'filter-buttons'}
                                        onClick={toggleNameChange}>Change album name</button>
                                    <button
                                        className={addSong ? 'filter-button-selected' : 'filter-buttons'}
                                        onClick={addSongs}>Add songs to album</button>
                                </span>
                            )}
                            {showForms && addSong && (
                                <div className="sidebar-add-song-created-album">
                                    <OpenModalMenuItem
                                        itemText='Add my songs'
                                        onItemClick={closeAddSong}
                                        modalComponent={<AlbumAddSongModal refresh={refresh} />}
                                    />
                                </div>
                            )}
                            {showForms && changeName && (
                                <div className='change-album-name-modal'>
                                    <OpenModalMenuItem
                                        itemText='Change Name'
                                        onItemClick={closeForm}
                                        modalComponent={<AlbumNameFormModal refresh={refresh} />}
                                    />
                                </div>
                            )}

                        </div>



                    </div>

                    {albumSongs && albumSongs.length > 0 ? (
                        <div className="container-song-tile">
                            {albumSongs.map((song, i) => (
                                <SongTile
                                    song={song}
                                    number={i + 1}
                                    key={`song${song.id}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>This album needs some love</p>
                    )}



                </div>

            ) : (
                <div>
                    <div className="content-header">
                        <h2 className='album-page-title'>List of all your albums</h2>
                    </div>
                    <div>
                        {ownersAlbums && ownersAlbums.length > 0 && isLoaded ? (
                            ownersAlbums.map(album => {
                                return <div key={album.id} className='album-tile'>
                                    <p onClick={() => handleClick(album.id)} className='select-album'>{album.title}</p>
                                </div>
                            })
                        ) : (
                            <p>Make your first album!</p>
                        )}
                    </div>
                </div>

            )}


        </div>
    )
}

export default AlbumsPage;
