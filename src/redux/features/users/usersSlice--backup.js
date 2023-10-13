import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

//const USERS_URL = 'http://localhost:3001/users';

const initialState = {
  users: [],
  testUser: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (initialUser) => {
    try {
      const response = await axios.post('/users/create', initialUser);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const updateUser = createAsyncThunk(
  'users/updateUser',

  async (initialUser) => {
    try {
      const response = await axios.put('/users/update', initialUser, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const user = {
        user_id: initialUser.id,
        user_fname: initialUser.fname,
        user_lname: initialUser.lname,
        user_email: initialUser.email,
        user_street: initialUser.street,
        user_street_nr: initialUser.street_nr,
        user_post_nr: initialUser.post_nr,
        user_living_place: initialUser.living_place,
        user_pid: initialUser.pid,
        user_birth_date: initialUser.birth_date,
        user_access_date: initialUser.access_date,
        user_role: initialUser.role,
        user_status: initialUser.status,
        user_password: initialUser.password,
      };

      response.data.user = user;
      return response;
      //  return initialUser;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  try {
    const response = await axios.delete(`/users/delete-user/${id}`);
    // if (response.status === 200) return initialUser;
  } catch (err) {
    return err.message;
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.users = action.payload;
        //state.users.push(action.payload);
        console.log(state.users);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        const newUSer = action.meta.arg;
        const newValue = { ...newUSer, user_id: action.payload.insertId };
        state.users.push(newValue);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user_id } = action.payload.data.user;
        const index = state.users.findIndex((user) => user.user_id === user_id);
        state.users[index] = action.payload.data.user;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.user_id === action.meta.arg
        );
        state.users.splice(index, 1);
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.user_id === userId);

export const findUserByName = (state, userName) => {
  console.log(userName);
};

export const { test } = usersSlice.actions;

export default usersSlice.reducer;
