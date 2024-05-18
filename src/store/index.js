// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import journalReducer from './journalSlice';

const store = configureStore({
  reducer: {
    journal: journalReducer,
  },
});

export default store;
