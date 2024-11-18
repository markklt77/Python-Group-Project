// import { csrfFetch } from "./csrf";

const LIKE_SONG = 'likes/likeSong'
const UNLIKE_SONG = 'likes/unlikeSong'

//Action Creators
const addLike = payload => ({
    type: LIKE_SONG,
    payload
})

const removeLike = songId => ({
    type: UNLIKE_SONG,
    songId
})

//Thunks
export const likeSong = (songId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

    });

    if (res.ok) {
        const data = await res.json()
        dispatch(addLike(data))
        return data
    }
}

export const unlikeSong = (songId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}/likes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if(res.ok){
        dispatch(removeLike(songId))
    }
}


const initialState = {};

const likesReducer = (state = initialState, action) => {
    // let newState
    switch (action.type) {
        default:
            return state;
    }
}

export default likesReducer;
