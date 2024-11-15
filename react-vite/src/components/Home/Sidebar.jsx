import { FiPlus } from "react-icons/fi";
import AlbumTile from "../Albums/AlbumTile";
import { useEffect, useRef, useState } from "react";
import PlaylistPage from "../Playlists/PlaylistsPage";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AlbumFormModal from "../AlbumFormModal/AlbumFormModal";

function Sidebar() {
    const [album, setAlbum] = useState(false)
    const [playlist, setPlaylist] = useState(true)
    const [showForms, setShowForms] = useState(false)
    const ulRef = useRef()



    const isAlbum = () => {
        setAlbum(true)
        setPlaylist(false)
    }
    const isPlaylist = () => {
        setPlaylist(true)
        setAlbum(false)
    }

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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

                    {showForms && album && (
                        <div>
                        <OpenModalMenuItem
                            itemText='Create Album'
                            onItemClick={closeForm}
                            modalComponent={<AlbumFormModal />}
                        />
                        </div>
                    )}

                </div>
                <div className="side-filters">
                    <button onClick={isPlaylist} className="filter-buttons">
                        Playlists
                    </button>
                    <button onClick={isAlbum} className="filter-buttons">
                        Albums
                    </button>
                </div>
            </div>
            <div>
                {album === true ? (
                    <AlbumTile />
                ) : (
                    <PlaylistPage />
                )}

            </div>
        </>
    )
}

export default Sidebar;
