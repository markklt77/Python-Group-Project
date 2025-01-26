import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkAllAlbums, thunkOneAlbum } from '../../redux/albums'
import { useNavigate } from "react-router-dom";
import './albums.css'



function AlbumTile({ albums, helpWithRefresh }) {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [arrAlbums, setArrAlbums] = useState(Object.values(albums))
    let navigate = useNavigate()

    useEffect(() => {
        setArrAlbums(Object.values(albums))
    }, [albums])

    useEffect(() => {
        dispatch(thunkAllAlbums()).then(() => setIsLoaded(true))
    }, [dispatch, helpWithRefresh]);

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
