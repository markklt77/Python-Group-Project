
// import Cookies from 'js-cookie';

//action types
const SET_PLAYLISTS = 'SET_PLAYLISTS';
const SET_SINGLE_PLAYLIST = 'SET_SINGLE_PLAYLIST';
const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST';
const REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST';
const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
const DELETE_PLAYLIST = 'DELETE_PLAYLIST'

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

const createPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist,
});

const removePlaylist = (playlistId) => ({
    type: DELETE_PLAYLIST,
    playlistId
})

//thunks
export const fetchUserPlaylists = () => async (dispatch) => {
    const response = await fetch('/api/users/playlists/test')
    if (response.ok) {
        const data = await response.json()
        // console.log(data)
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

        //refetch the playlist to include new song
        const updatedPlaylistResponse = await fetch(`/api/users/playlists/${playlistId}`);
        if (updatedPlaylistResponse.ok) {
            const updatedPlaylistData = await updatedPlaylistResponse.json();
            dispatch(setSinglePlaylist(updatedPlaylistData));
        }
        // console.log(data)
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
        // const data = await response.json();
        dispatch(removeSong(songId, playlistId));
        // console.log(data.message)
    } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove song from playlist");
    }
};

export const createNewPlaylist = (playlistData) => async (dispatch) => {
    try {
        const response = await fetch('/api/users/playlists/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistData),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(createPlaylist(data));
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create playlist');
        }
    } catch (error) {
        console.error('Error creating playlist:', error);
    }
};

export const deletePlaylist = (playlistId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/users/playlists/${playlistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // const data = await response.json();
            // console.log(data.message);

            dispatch(removePlaylist(playlistId));
        } else {
            const error = await response.json();
            throw new Error(error.error || "Failed to delete playlist");
        }
    } catch (error) {
        console.error('Error deleting playlist:', error);
    }
};




const initialState = {allPlaylists: {}, currentPlaylist: null};

export default function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYLISTS:{
            const newState = { ...state, allPlaylists: {...state.allPlaylists}};
            action.playlists.forEach((playlist) => {
                newState.allPlaylists[playlist.id] = playlist;
            });
            return newState;
        }
        case SET_SINGLE_PLAYLIST:{
            const newState = { ...state, currentPlaylist: action.playlist}

            if (newState.allPlaylists[action.playlist.id]) {
                newState.allPlaylists[action.playlist.id] = action.playlist
            }
            return newState
        }
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
            console.log(updatedPlaylist)
            return {
                ...state,
                allPlaylists: {
                    ...state.allPlaylists,
                    [action.playlistId]: updatedPlaylist,
                },
                currentPlaylist: updatedPlaylist,
            };
        }

        case CREATE_PLAYLIST: {
            return {
                ...state,
                allPlaylists: {
                    ...state.allPlaylists,
                    [action.playlist.id]: action.playlist,
                },
            };
        }

        case DELETE_PLAYLIST: {
            const newState = { ...state };
            delete newState.allPlaylists[action.playlistId];
            if (state.currentPlaylist && state.currentPlaylist.id === action.playlistId) {
                newState.currentPlaylist = null;
            }
            return newState
        }

        default:
            return state;
    }
}
