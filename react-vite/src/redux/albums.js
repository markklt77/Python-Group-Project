// import { csrfFetch } from "./csrf"


//action
const GET_ALL_ALBUMS = 'albums/getAllAlbums'
const DELETE_ALBUM = 'albums/deleteAlbum'
const GET_ONE_ALBUM = 'albums/getOneAlbum'
const DELETE_SONG = 'albums/deleteSong'


const getAllAlbums = albums => ({
    type: GET_ALL_ALBUMS,
    albums
})

const getOneAlbum = album => ({
    type: GET_ONE_ALBUM,
    album
})


const deleteAlbum = albumId => ({
    type: DELETE_ALBUM,
    albumId
})

const deleteSong = songInfo => ({
    type: DELETE_SONG,
    songInfo
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
    if (res.ok) {
        const data = await res.json()
        // console.log(data,'the data')
        dispatch(getOneAlbum(data))
    } else {
        return await res.json()
    }
}


export const thunkMakeAlbum = (album) => async (dispatch) => {
    const res = await fetch("/api/albums/create-album", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album)
    })

    // console.log(res, 'resfrom the thunk')
    // console.log('album data from thunk',res)
    if (res.ok) {
        // let data = await res.json()
        // console.log('data from thunk res', data)
        // dispatch(createAlbum(data))
        dispatch(thunkAllAlbums())
    } else {
        let data = await res.json()
        // console.log('error data',data)
        return data
    }
}


export const thunkDeleteAlbum = (albumId) => async (dispatch) => {
    // console.log(albumId, 'from the thunk')
    const res = await fetch(`/api/albums/${albumId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })

    if (res.ok) {
        // let data = await res.json()
        dispatch(deleteAlbum(albumId))
        // console.log(data, 'from the thunk')

        // return data
    } else {
        return await res.json()
    }
}

export const thunkChangeAlbum = (albumInfo) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumInfo.albumId}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(albumInfo)
    })
    // console.log(res)
    // console.log(albumInfo,'from the thunk')
    if (res.ok) {
        dispatch(thunkAllAlbums())
        return await res.json()
    } else {
        return await res.json()
    }
}

export const thunkAddSong = (songInfo) => async () => {
    let albumId = songInfo.id
    songInfo.songs.forEach(async (song) => {
        let ids = {albumId:albumId, songId:song.id}
        let res = await fetch(`/api/albums/${albumId}/song/${song.id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ids)
        }
        )

        if (res.ok){
            let data = await res.json()
            return data
        }else{
            return await res.json()
        }
    })
}


export const thunkRemoveSong = (songInfo) => async (dispatch) => {
    // console.log(songInfo)
    let songId = songInfo.songId
    let albumId = songInfo.albumId
    let res = await fetch(`/api/albums/${albumId}/song/${songId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(songInfo)
    })

    // console.log(res)
    if(res.ok){
        dispatch(deleteSong(songInfo))
        return await res.json()
        // console.log(await res.json(), 'this is the message')

    } else {
        return await res.json()
    }
}


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
            let newState = { ...state }
            let i = 0
            // console.log(newState)
            newState.selected = {}
            action.album.songs.forEach(song => {
                i += 1
                newState.selected[i] = song
            })
            return newState
        }
        case DELETE_ALBUM: {
            let newState = { ...state }
            delete newState.all[action.albumId]
            return newState
        }
        case DELETE_SONG: {
            let newState = { ...state }
            delete newState.selected[action.songInfo.songId]
            return newState
        }
        default:
            return state

    }
}


export default albumReducer
