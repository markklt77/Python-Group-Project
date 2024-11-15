
// import Cookies from 'js-cookie';

//action types
const SET_PLAYLISTS = 'SET_PLAYLISTS';
const SET_SINGLE_PLAYLIST = 'SET_SINGLE_PLAYLIST';
const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST';
const REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST';

//action creators
const setPlaylists = (playlists) => ({
    type: SET_PLAYLISTS,
    playlists,
});

const setSinglePlaylist = (playlist) => ({
    type: SET_SINGLE_PLAYLIST,
    playlist,
  });

const addSong = (song, playlistId) => ({
    type: ADD_SONG_TO_PLAYLIST,
    song,
    playlistId,
});

const removeSong = (songId, playlistId) => ({
    type: REMOVE_SONG_FROM_PLAYLIST,
    songId,
    playlistId,
});

//thunks
export const fetchUserPlaylists = () => async (dispatch) => {
    const response = await fetch('/api/users/playlists/test')
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(setPlaylists(data.playlists));
    }
};

export const fetchPlaylistById = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/users/playlists/${playlistId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setSinglePlaylist(data));
    }
  };

export const addSongToPlaylist = (playlistId, songId) => async (dispatch) => {
    const response = await fetch(`/api/users/playlists/${playlistId}/songs/${songId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addSong(data.song, playlistId));
        console.log(data)
    } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to add song to playlist");
    }
};

export const removeSongFromPlaylist = (playlistId, songId) => async (dispatch) => {
    const response = await fetch(`/api/users/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeSong(songId, playlistId)); // Update the playlist in state
        console.log(data.message)
    } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove song from playlist");
    }
};



const initialState = {allPlaylists: {}, currentPlaylist: null};

export default function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYLISTS:
            const newState = { ...state, allPlaylists: {...state.allPlaylists}};
            action.playlists.forEach((playlist) => {
                newState.allPlaylists[playlist.id] = playlist;
            });
            return newState;
        case SET_SINGLE_PLAYLIST:
            return { ...state, currentPlaylist: action.playlist}

        case ADD_SONG_TO_PLAYLIST: {
            const updatedPlaylist = { ...state.allPlaylists[action.playlistId] };
            updatedPlaylist.songs = [...updatedPlaylist.songs, action.song];
            return {
                ...state,
                allPlaylists: {
                    ...state.allPlaylists,
                    [action.playlistId]: updatedPlaylist,
                },
                currentPlaylist: updatedPlaylist,
            };
        }

        case REMOVE_SONG_FROM_PLAYLIST: {
            const updatedPlaylist = { ...state.allPlaylists[action.playlistId] };
            updatedPlaylist.songs = updatedPlaylist.songs.filter(
                (song) => song.id !== action.songId
            );
            return {
                ...state,
                allPlaylists: {
                    ...state.allPlaylists,
                    [action.playlistId]: updatedPlaylist,
                },
                currentPlaylist: updatedPlaylist,
            };
        }
        default:
            return state;
    }
}
