import { createSlice } from '@reduxjs/toolkit';

const belts = [
  {
    id: 1,
    belt: 'White',
    color: 'white',
  },
  {
    id: 2,
    belt: 'Gray-White',
    color: 'gray-white',
  },
  {
    id: 3,
    belt: 'Gray',
    color: 'gray',
  },
  {
    id: 4,
    belt: 'Gray-Black',
    color: 'gray-black',
  },
  {
    id: 5,
    belt: 'Yellow-White',
    color: 'yellow-white',
  },
  {
    id: 6,
    belt: 'Yellow',
    color: 'yellow',
  },
  {
    id: 7,
    belt: 'Yellow-Black',
    color: 'yellow-black',
  },
  {
    id: 8,
    belt: 'Orange-White',
    color: 'orange-white',
  },
  {
    id: 9,
    belt: 'Orange',
    color: 'orange',
  },
  {
    id: 10,
    belt: 'Orange-Black',
    color: 'orange-black',
  },
  {
    id: 11,
    belt: 'Green-White',
    color: 'green-white',
  },
  {
    id: 12,
    belt: 'Green',
    color: 'green',
  },
  {
    id: 13,
    belt: 'Green-Black',
    color: 'green-black',
  },
  {
    id: 14,
    belt: 'Blue',
    color: 'blue',
  },
  {
    id: 15,
    belt: 'Purple',
    color: 'purple',
  },
  {
    id: 16,
    belt: 'Brown',
    color: 'brown',
  },
  {
    id: 17,
    belt: 'Black',
    color: 'black',
  },
];

const initialState = {
  belts: belts,
};

export const ranksSlice = createSlice({
  name: 'ranks',
  initialState,
});
export default ranksSlice.reducer;
