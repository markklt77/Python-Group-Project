import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { thunkAllAlbums, thunkOneAlbum } from '../../redux/albums'
import { useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
import './albums.css'



function AlbumTile({ albums, helpWithRefresh }) {
    // const [showForms, setShowForms] = useState(false)
    // const albums = useSelector(state => state.albums.all)
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    let navigate = useNavigate()
    // const { state } = useLocation();
    // const [delRefresh, setDelRefresh] = useState(state.deleteRefresh)
    // const ulRef = useRef()

    // console.log(albums)

    let arrAlbums = Object.values(albums)

    useEffect(() => {
        dispatch(thunkAllAlbums()).then(() => setIsLoaded(true))
    }, [dispatch, helpWithRefresh]);

    // console.log(delRefresh)
    let handleClick = (id) => {
        dispatch(thunkOneAlbum(id))
            .then(() => navigate(`/albums/${id}`))

    };

    return (
        <div className='div-container-all-albums'>
            <h4 className='album-tile-h4-tag'>All Available Albums</h4>
            {isLoaded && arrAlbums.length > 0 ? (
                arrAlbums.map(album => {
                    return <div key={album.id} className='album-tile'>
                        <p onClick={() => handleClick(album.id)} className='select-album'>{album.title}</p>
                    </div>
                })
            ) : (
                <p>No available albums.</p>
            )}
        </div>

    )
}

export default AlbumTile;
