import { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { thunkAllAlbums, thunkOneAlbum } from '../../redux/albums'
import { useNavigate } from "react-router-dom";


function AlbumTile() {

    const albums = useSelector(state => state.albums.all)
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    let navigate = useNavigate()
    // console.log(albums)

    let arrAlbums = Object.values(albums)

    // console.log(arrAlbums)
    useEffect(() => {
        dispatch(thunkAllAlbums()).then(()=>setIsLoaded(true))
    }, [dispatch]);

    let handleClick = (id) => {
        // return <redirect to="/albums"/>
        // console.log(id)
        dispatch(thunkOneAlbum(id)).then(() => navigate(`/albums/${id}`))
        
    };

    return (
        <div className='div-container-all-albums'>
            <p>This will render all the albums</p>
            {isLoaded && arrAlbums.length > 0 ? (
                arrAlbums.map(album => {
                    return <div key={album.id} className='album-tile'>
                        <button onClick={()=>handleClick(album.id)} className='select-album'>{album.title}</button>
                    </div>
                })
            ) : (
                <p>No available albums.</p>
            )}
        </div>

    )
}

export default AlbumTile;
