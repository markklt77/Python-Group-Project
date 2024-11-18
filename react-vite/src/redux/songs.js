const SET_SONGS = 'songs/setSongs'
const SET_ONE = 'songs/setOne'
const SELECTED_SONG = 'songs/selectedSong'

// Action creators
const setAllSongs = songs => ({
    type: SET_SONGS,
    songs
})

const setOneSong = song => ({
    type: SET_ONE,
    song
})

const setCurrentSong = song => ({
    type: SELECTED_SONG,
    song
})

// Thunks
export const getAllSongs = () => async dispatch => {
    const response = await fetch("/api/songs");
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setAllSongs(data));
	}
}

export const getOneSong = (id) => async dispatch => {
    const response = await fetch(`/api/songs/${id}`);
    if (response.ok) {
		const data = await response.json();
		dispatch(setOneSong(data));
	}
    return response
}

// For playback
export const getCurrentSong = (id) => async dispatch => {
    const response = await fetch(`/api/songs/${id}`);
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setCurrentSong(data));
	}
}

export const uploadSong = (songData) => async dispatch => {
    const response = await fetch(`/api/songs/test`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: songData
    });

    // console.log(response)
    if (response.ok) {
        dispatch(getAllSongs());
	}
    return response;
}

export const updateSong = (songData) => async dispatch => {
    const response = await fetch(`/api/songs/${songData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(songData)
    });

    if (response.ok) {
        const data = response.json()
        dispatch(getAllSongs());
        return data
	}
    return response;
}

export const deleteSong = (songId) => async dispatch => {
    const response = await fetch(`/api/songs/${songId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = response.json()
        dispatch(getAllSongs());
        return data
	}
    return response;
}

const initialState = { all: {}, current: {}}

function songsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SONGS: {
            const flatSongs = {}
            // Flatten data
            action.songs.forEach(song => {
                flatSongs[song.id] = song
            })
            return {
                all: { ...flatSongs },
                current: { ...state.current }
            }
        }
        case SET_ONE:{
            const newState = {
                all: { ...state.all },
                current: { ...state.song }
            }
            newState[action.song.id] = action.song
            return newState
        }
        case SELECTED_SONG:
            return {
                all: { ...state.all },
                current: { ...action.song }
            }
        default:
            return state;
    }
}

export default songsReducer;
