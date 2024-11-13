import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { thunkAllAlbums } from '../../redux/albums'
import { redirect } from 'react-router-dom'
function AlbumTile() {

    const albums = useSelector(state => state.albums)
    const dispatch = useDispatch()
    // console.log(albums)

    let arrAlbums = Object.values(albums)

    // console.log(arrAlbums)
    useEffect(() => {
        dispatch(thunkAllAlbums())
    }, [dispatch]);

    let handleClick = () => {
        return <redirect to='a'/>
    };

    return (
        <div className='div-container-all-albums'>
            <p>This will render a single list item for an album</p>
            {arrAlbums.length > 0 ? (
                arrAlbums.map(album => {
                    return <div key={album.id} className='album-tile'>
                        <button onClick={handleClick} className='select-album'>{album.title}</button>
                    </div>
                })
            ) : (
                <p>No available albums.</p>
            )}
        </div>

    )
}

export default AlbumTile;
