import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Chat {
  usersQuery: string;
  openaiResponse: string;
}

interface ChatHistoryState {
  data: Chat[];
  loading: boolean;
  totalPages: number;
}

const initialState: ChatHistoryState = {
  data: [],
  loading: false,
  totalPages: 0,
};

const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    fetchChatHistoryStart(state) {
      state.loading = true;
    },
    fetchChatHistorySuccess(state, action: PayloadAction<{ data: Chat[]; totalPages: number }>) {
      state.loading = false;
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
    },
    fetchChatHistoryFailure(state) {
      state.loading = false;
    },
  },
});

export const { fetchChatHistoryStart, fetchChatHistorySuccess, fetchChatHistoryFailure } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;
