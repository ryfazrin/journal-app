// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import journalReducer from './journalSlice';
import tagsReducer from './tagsSlice';

const store = configureStore({
  reducer: {
    journal: journalReducer,
    tags: tagsReducer,
  },
});

export default store;
