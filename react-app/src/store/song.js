// constants
const GET_ALL_SONGS = "songs/GET_ALL_SONGS";
const GET_SONG_BY_ID = "songs/GET_SONG_BY_ID";
const UPLOAD_SONG = "songs/UPLOAD_SONG";
const DELETE_SONG = "songs/DELETE_SONG";
const UPDATE_SONG = "songs/UPDATE_SONG";
const GET_USER_SONGS = "songs/GET_USER_SONGS";

const getAllSongs = (songs) => ({
  type: GET_ALL_SONGS,
  payload: songs,
});

const getSongById = (song) => ({
  type: GET_SONG_BY_ID,
  payload: song,
});

const uploadSong = (song) => ({
  type: UPLOAD_SONG,
  payload: song,
});

const deleteSong = (songId) => ({
  type: DELETE_SONG,
  payload: songId,
});

const updateSong = (updatedSong) => ({
  type: UPDATE_SONG,
  payload: updatedSong,
});

const getUserSongs = (songs) => ({
  type: GET_USER_SONGS,
  payload: songs,
});

export const fetchAllSongs = () => async (dispatch) => {
  const response = await fetch("/api/songs/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSongs(data));
  }
};

export const fetchSongById = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getSongById(data));
  }
};

export const createSong = (songData) => async (dispatch) => {
  try {
    const response = await fetch("/api/songs/", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: songData,
    });

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json();
        return { errors: data.errors };
      } else {
        throw new Error("Server error");
      }
    }

    const data = await response.json();
    dispatch(uploadSong(data));
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return { errors: ["Network error"] };
  }
};

export const removeSong = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSong(songId));
  } else {
  }
};

export const editSong = (songId, updatedData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/songs/${songId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateSong(data));
      return data;
    } else {
      const data = await response.json();
      return { errors: data.errors };
    }
  } catch (error) {
    console.error('Network error:', error);
    return { errors: ['Network error'] };
  }
};

export const fetchUserSongs = () => async (dispatch) => {
  const response = await fetch("/api/songs/user");
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSongs(data));
  }
};

const initialState = { songs: [] };

export default function songsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SONGS:
      return { ...state, songs: action.payload };
    case GET_SONG_BY_ID:
      return { ...state, currentSong: action.payload };
    case UPLOAD_SONG:
      return { ...state, songs: [...state.songs, action.payload] };
    case UPDATE_SONG:
      const updatedIndex = state.songs.findIndex((song) => song.id === action.payload.id);
      if (updatedIndex !== -1) {
        const updatedSongs = [...state.songs];
        updatedSongs[updatedIndex] = action.payload;
        return { ...state, songs: updatedSongs };
      }
      return state;
    case DELETE_SONG:
      return {
        ...state,
        songs: state.songs.filter((song) => song.id !== action.payload),
      };
    default:
      return state;
  }
}
