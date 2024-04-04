import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postsService';

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
  try {
    return await postsService.createPost(post);
  } catch (err) {
    return err.message;
  }
});

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    return await postsService.fetchPosts();
  } catch (err) {
    return err.message;
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  try {
    return await postsService.removePost(id);
  } catch (err) {
    return err.message;
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (id) => {
  try {
    return await postsService.editPost(id);
  } catch (err) {
    return err.message;
  }
});

export const postsSlice = createSlice({
  name: 'posts',
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
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.posts = null;
        state.message = action.payload;
      })
      .addCase(addNewPost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isSuccess = false;
        const newPost = action.meta.arg;
        const newValue = { ...newPost, post_id: action.payload.insertId };
        state.posts.push(newValue);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.post_id === action.meta.arg
        );
        state.posts.splice(index, 1);
        state.isLoading = false;
        state.isSuccess = true;

        /* console.log(current(state.posts)); */
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { post_id } = action.payload.data.post;
        const index = state.posts.findIndex(
          (post) => post.post_id === Number(post_id)
        );
        state.posts[index] = action.payload.data.post;
      });
  },
});

export const { reset } = postsSlice.actions;

export const selectPostByID = (state, postId) =>
  state.posts.posts.find((post) => post.post_id === postId);

export default postsSlice.reducer;
