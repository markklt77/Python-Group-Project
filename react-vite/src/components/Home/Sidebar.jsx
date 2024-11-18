import { FiPlus } from "react-icons/fi";
import AlbumTile from "../Albums/AlbumTile";
import { useEffect, useRef, useState } from "react";
import PlaylistPage from "../Playlists/PlaylistsPage";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AlbumFormModal from "../AlbumFormModal/AlbumFormModal";
import { useSelector } from "react-redux";
import CreatePlaylistForm from "../Playlists/PlaylistForm";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const [album, setAlbum] = useState(false)
    const [playlist, setPlaylist] = useState(true)
    const [showForms, setShowForms] = useState(false)
    // const [addSongs, setAddSongs] = useState(false)
    const [helpWithRefresh, setHelpWithRefresh] = useState(0)
    const [newAlbum, setNewAlbum] = useState(null)
    // const [myAlbum, setMyAlbum] = useState(false)
    let albums = useSelector(state => state.albums.all)
    const ulRef = useRef()
    let navigate = useNavigate()
    // const recentAlbumRef = useRef(null);
    // let albumArr = Object.values(albums)


    let refresh = () => {
        setHelpWithRefresh(prev => prev + 1)
    }

    // let addSong = (album) => {
    //     setAddSongs(true)
    //     setNewAlbum(album)
    // }


    const isAlbum = () => {
        setAlbum(true)
        setPlaylist(false)

    }
    const isPlaylist = () => {
        setPlaylist(true)
        setAlbum(false)

    }
    const isMyAlbum = () => {
        navigate('/albums')
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


    return (
        <>
            <div className="head-container">
                <div className="side-head">
                    <h3>Library</h3>
                    <FiPlus onClick={toggleMenu} className="faplus" />
                </div>

                {showForms && playlist && (
                    <div>
                        <OpenModalMenuItem
                            itemText='Create Playlist'
                            onItemClick={closeForm}
                            modalComponent={<CreatePlaylistForm />}
                        />
                    </div>
                )}

                {showForms && album && (
                    <div className="sidebar-create-album">
                        <OpenModalMenuItem
                            itemText='Create Album'
                            onItemClick={closeForm}
                            modalComponent={<AlbumFormModal refresh={refresh} />}
                        />
                    </div>
                )}

                <div className="side-filters">
                    <button onClick={isPlaylist} className={playlist ? 'filter-button-selected' : 'filter-buttons'}>
                        Playlists
                    </button>
                    <button onClick={isAlbum} className={album ? 'filter-button-selected' : 'filter-buttons'}>
                        Albums
                    </button>
                    <span>
                        <button onClick={isMyAlbum} className='filter-buttons-my-album'>
                            My Albums
                        </button>
                    </span>

                </div>
            </div>
            <div>
                {album === true ? (
                    <AlbumTile
                        albums={albums}
                        helpWithRefresh={helpWithRefresh}
                    />
                ) : (
                    <PlaylistPage />
                )}

            </div>
        </>
    )
}

export default Sidebar;
