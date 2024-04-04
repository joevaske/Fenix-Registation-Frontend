import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import youtubeService from './youtubeService';

const initialState = {
  videos: [],
  royDeanVideos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getVideos = createAsyncThunk('videos/getVideos', async () => {
  try {
    return await youtubeService.fetchVideos();
  } catch (err) {
    return err.message;
  }
});

export const getRoyDeanVideos = createAsyncThunk(
  'videos/getRoyDeanVideos',
  async () => {
    try {
      return await youtubeService.fetchRoyDeanVideos();
    } catch (err) {
      return err.message;
    }
  }
);

export const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getVideos.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.videos = null;
        state.message = action.payload;
      })
      .addCase(getRoyDeanVideos.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getRoyDeanVideos.fulfilled, (state, action) => {
        state.royDeanVideos = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getRoyDeanVideos.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.royDeanVideos = null;
        state.message = action.payload;
      });
  },
});
export default youtubeSlice.reducer;
