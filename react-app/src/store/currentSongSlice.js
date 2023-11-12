import { createSlice } from '@reduxjs/toolkit';

const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState: {
    currentSong: null,
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { setCurrentSong } = currentSongSlice.actions;
export default currentSongSlice.reducer;
