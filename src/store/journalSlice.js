// src/store/journalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: JSON.parse(localStorage.getItem('journalEntries')) || [],
  filter: {
    keyword: '',
    tag: '',
    date: '',
  },
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addEntry: (state, action) => {
      state.entries.push(action.payload);
      localStorage.setItem('journalEntries', JSON.stringify(state.entries));
    },
    deleteEntry: (state, action) => {
      state.entries = state.entries.filter((entry) => entry.id !== action.payload);
      localStorage.setItem('journalEntries', JSON.stringify(state.entries));
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { addEntry, deleteEntry, setFilter } = journalSlice.actions;
export default journalSlice.reducer;
