import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { thunkAllAlbums, thunkOneAlbum } from "../../redux/albums";
import { useLoading } from "../../context/LoadingContext";
import AlbumTile from "../Albums/AlbumTile";
import PlaylistPage from "../Playlists/PlaylistsPage";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AlbumFormModal from "../AlbumFormModal/AlbumFormModal";
import CreatePlaylistForm from "../Playlists/PlaylistForm";

function Sidebar() {
    const [album, setAlbum] = useState(true)
    const [playlist, setPlaylist] = useState(false)
    const [showForms, setShowForms] = useState(false)
    const [helpWithRefresh, setHelpWithRefresh] = useState(0)
    const [myAlbum, setMyAlbum] = useState(false)
    const { isLoading, setIsLoading } = useLoading()
    let albums = useSelector(state => state.albums.all)
    let user = useSelector(state => state.session.user)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const ulRef = useRef()
    let albumArr = Object.values(albums)

    const [ownersAlbums] = useState(
        albumArr?.filter((album) => {
            return album.artist_id === user?.id
    }))

    useEffect(() => {
        dispatch(thunkAllAlbums())
            .then(() => setIsLoading(false))
    }, [dispatch, setIsLoading]);


    let refresh = () => {
        setHelpWithRefresh(prev => prev + 1)
    }

    const isAlbum = () => {
        setAlbum(true)
        setPlaylist(false)
        setMyAlbum(false)
    }

    const isPlaylist = () => {
        setPlaylist(true)
        setAlbum(false)
        setMyAlbum(false)
    }

    const isMyAlbum = () => {
        setPlaylist(false)
        setAlbum(false)
        setMyAlbum(true)
    }


    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowForms(!showForms);
    };


    useEffect(() => {
        if (!showForms) return;

        const closeForm = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowForms(false);
            }
        };

        document.addEventListener('click', closeForm);

        return () => document.removeEventListener('click', closeForm)
    }, [showForms])

    const closeForm = () => setShowForms(false)

    let handleClick = (id) => {
        dispatch(thunkOneAlbum(id))
            .then(() => navigate(`/albums/${id}`))

    };


    return (
        <>
            <div className="head-container">
                <div className="side-head">
                    <h3>Library</h3>
                    <FiPlus onClick={toggleMenu} className="faplus" />
                </div>

                {showForms && playlist && (
                    <div className="sidebar-buttons-container">
                        <OpenModalMenuItem
                            itemText={<span className="create-playlist-text">Create Playlist</span>}
                            onItemClick={closeForm}
                            modalComponent={<CreatePlaylistForm />}
                            newClass={"create-playlist-open-modal-button filter-buttons"}
                        />
                    </div>
                )}

                {showForms && (album || myAlbum) && (
                    <div className="sidebar-buttons-container">
                        <OpenModalMenuItem
                            itemText='Create Album'
                            onItemClick={closeForm}
                            modalComponent={<AlbumFormModal refresh={refresh} />}
                            newClass={"create-album-open-modal-button filter-buttons"}
                        />
                    </div>
                )}

                <div className="side-filters">
                    <button onClick={isAlbum} className={album ? 'filter-button-selected' : 'filter-buttons'}>
                        Albums
                    </button>
                    {user && (
                        <button onClick={isMyAlbum} className={myAlbum ? 'filter-button-selected' : 'filter-buttons'}>
                            My Albums
                        </button>
                    )}
                    <button onClick={isPlaylist} className={playlist ? 'filter-button-selected' : 'filter-buttons'}>
                        Playlists
                    </button>



                </div>
            </div>
            <div>
                {!isLoading && album === true && (
                    <AlbumTile
                        albums={albums}
                        helpWithRefresh={helpWithRefresh}
                    />
                )}

                {!isLoading && playlist === true && (
                    <PlaylistPage />
                )}

                {!isLoading && ownersAlbums && myAlbum === true && (
                    <div className='div-container-all-albums'>
                        <h4 className='album-tile-h4-tag'>All Available Albums</h4>
                        {ownersAlbums.length > 0 ? (
                            ownersAlbums.map(album => {
                                return <div key={album.id} className='album-tile'>
                                    <p onClick={() => handleClick(album.id)} className='select-album'>{album.title}</p>
                                </div>
                            })
                        ) : (
                            <p>No available albums.</p>
                        )}
                    </div>
                )}

            </div>
        </>
    )
}

export default Sidebar;
