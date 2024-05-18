// src/store/journalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: JSON.parse(localStorage.getItem('journalEntries')) || [],
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addEntry: (state, action) => {
      state.entries.push(action.payload);
      localStorage.setItem('journalEntries', JSON.stringify(state.entries));
    },
    editEntry: (state, action) => {
      const { id, title, content } = action.payload;
      const existingEntry = state.entries.find((entry) => entry.id === id);
      if (existingEntry) {
        existingEntry.title = title;
        existingEntry.content = content;
        localStorage.setItem('journalEntries', JSON.stringify(state.entries));
      }
    },
    deleteEntry: (state, action) => {
      state.entries = state.entries.filter((entry) => entry.id !== action.payload);
      localStorage.setItem('journalEntries', JSON.stringify(state.entries));
    },
  },
});

export const { addEntry, editEntry, deleteEntry } = journalSlice.actions;
export default journalSlice.reducer;