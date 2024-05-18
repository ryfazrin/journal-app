// src/store/tagsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: JSON.parse(localStorage.getItem('tags')) || [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      state.tags.push(action.payload);
      localStorage.setItem('tags', JSON.stringify(state.tags));
    },
    deleteTag: (state, action) => {
      state.tags = state.tags.filter((tag) => tag !== action.payload);
      localStorage.setItem('tags', JSON.stringify(state.tags));
    },
  },
});

export const { addTag, deleteTag } = tagsSlice.actions;
export default tagsSlice.reducer;
