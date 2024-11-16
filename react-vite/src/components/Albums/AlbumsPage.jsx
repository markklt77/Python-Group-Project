import AlbumSongs from './AlbumSongs';
// import AlbumTile from './AlbumTile'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkOneAlbum, thunkDeleteAlbum, thunkAllAlbums } from '../../redux/albums'
import AlbumNameFormModal from '../AlbumFormModal/AlbumNameFormModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
// import AlbumAddSong from '../Albums/AlbumAddSong'


function AlbumsPage() {
    let { albumId } = useParams()
    let dispatch = useDispatch()
    let albums = useSelector(state => state.albums.all)
    let album = useSelector(state => state.albums.all[albumId])
    let user = useSelector(state => state.session.user)
    let [isLoaded, setIsLoaded] = useState(false)
    const [showForms, setShowForms] = useState(false)
    let navigate = useNavigate()
    const [helpWithRefresh, setHelpWithRefresh] = useState(0)
    // let [deleteRefresh, setDeleteRefresh] = useState(0)
    const ulRef = useRef()

    let refresh = () => {
        setHelpWithRefresh(prev => prev + 1)
    }


    useEffect(() => {
        dispatch(thunkAllAlbums()).then(() => setIsLoaded(true))
        dispatch(thunkOneAlbum(albumId))
    }, [dispatch, albumId])



    let ownersAlbums = Object.values(albums).filter((album) => {
        return album.artist_id === user.id
    })


    // console.log(ownersAlbums)
    let handleDelete = () => {
        // console.log(user.id, album.artist_id)
        if (user.id === album.artist_id) {
            let res = dispatch(thunkDeleteAlbum(albumId))
            if (res) {
                // setDeleteRefresh(prev => prev + 1)
                // dispatch(thunkAllAlbums())
                navigate('/albums')
                alert('Album was deleted')

            }
        } else {
            return alert('You must be the creator of an album to delete it')
        }
    }


    const toggleNameChange = (e) => {
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
        dispatch(thunkOneAlbum(id)).then(() => navigate(`/albums/${id}`))
    };



    return (
        <div className="content">

            {albumId && album ? (
                <div>
                    <div className="content-header">
                        <span>
                            <p>List of songs for {album.title}</p>
                            <button onClick={handleDelete}>Delete album</button>
                            <button onClick={toggleNameChange}>Change album name</button>
                        </span>
                        {showForms && albumId && (
                            <div>
                                <OpenModalMenuItem
                                    itemText='Change Name'
                                    onItemClick={closeForm}
                                    modalComponent={<AlbumNameFormModal refresh={refresh} />}
                                />
                            </div>
                        )}
                    </div>

                    <AlbumSongs />


                </div>

            ) : (
                <div>
                    <div className="content-header">
                        <p>list of current users Albums</p>
                    </div>
                    <div>
                        {ownersAlbums.length > 0 && isLoaded ? (
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
