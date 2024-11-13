//action
const GET_ALL_ALBUMS = 'albums/getAllAlbums'

const getAllAlbums = albums => ({
    type: GET_ALL_ALBUMS,
    albums
})



//Thunk
export const thunkAllAlbums = () => async (dispatch) => {
    const res = await fetch("/api/albums")

    if (res.ok) {
        const data = await res.json()
        // console.log('thisis the data',data.albums)
        dispatch(getAllAlbums(data))
    } else {
        return await res.json()
    }
}


//reducer
let initialState = {}

function albumReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ALBUMS: {
            // console.log(action.albums)
            let newState = { ...state }
            // console.log('this si the action',action.albums.albums)
            action.albums.albums.forEach(album => {
                // console.log(album)
                newState[album.id] = album
            })
            return newState
        }
        default:
            return state

    }
}


export default albumReducer
