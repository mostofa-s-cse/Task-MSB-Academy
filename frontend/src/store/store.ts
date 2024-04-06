import { configureStore } from '@reduxjs/toolkit';
import chatHistoryReducer from './chatHistorySlice';

const store = configureStore({
  reducer: {
    chatHistory: chatHistoryReducer,
  },
});

export default store;
