import { createSlice } from '@reduxjs/toolkit';

const types = [
  {
    id: 1,
    type: 'news',
  },
  {
    id: 2,
    type: 'slider',
  },
  {
    id: 3,
    type: 'note',
  },
  {
    id: 4,
    type: 'todo',
  },
  {
    id: 5,
    type: 'personal',
  },
];

const initialState = {
  types: types,
};

export const postTypesSlice = createSlice({
  name: 'postTypes',
  initialState,
});

export default postTypesSlice.reducer;
