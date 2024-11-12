const SET_SONGS = 'songs/setSongs'
const SELECTED_SONG = 'songs/selectedSong'

// Action creators
const setAllSongs = songs => ({
    type: SET_SONGS,
    songs
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
		if (data.errors) {
			return;
		}

		dispatch(setCurrentSong(data));
	}
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