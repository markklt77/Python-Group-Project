import { csrfFetch } from "./csrf"


//action
const GET_ALL_ALBUMS = 'albums/getAllAlbums'
const MAKE_ALBUM = 'albums/makeAlbum'
const GET_ONE_ALBUM = 'albums/getOneAlbum'

const getAllAlbums = albums => ({
    type: GET_ALL_ALBUMS,
    albums
})

const getOneAlbum = album => ({
    type: GET_ONE_ALBUM,
    album
})




//Thunk
export const thunkAllAlbums = () => async (dispatch) => {
    const res = await fetch("/api/albums")

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllAlbums(data))

    } else {
        return await res.json()
    }
}

export const thunkOneAlbum = (album_id) => async (dispatch) => {
    const res = await fetch(`/api/albums/${album_id}`)
    // console.log('the res and id', res, album_id)
    if(res.ok) {
        const data = await res.json()
        // console.log(data,'the data')
        dispatch(getOneAlbum(data))
    } else {
        return await res.json()
    }
}


// export const thunkMakeAlbum = (album) => async (dispatch) => {
//     const res = await csrfFetch("/api/albums", {
//         method: "POST",
//         body: JSON.stringify(album)
//     })
//     console.log('album data from thunk',album)
//     // if(res.ok){
//     //     let data = await res.json()
//     //     console.log('data from thunk res', data)
//     //     dispatch(createAlbum(data))
//     // } else {
//     //     let data = await res.json()
//     //     // console.log(data)
//     //     return data
//     // }
// }


//reducer
let initialState = {
    all: {},
    selected: {}
}

function albumReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ALBUMS: {
            let newState = { ...state }
            action.albums.albums.forEach(album => {
                newState.all[album.id] = album
            })
            return newState
        }
        case GET_ONE_ALBUM: {
            let newState = {...state}
            // console.log(newState)
            newState.selected = {}
            action.album.songs.forEach(song => {
                newState.selected[song.id] = song
            })
            return newState
        }
        default:
            return state

    }
}


export default albumReducer
