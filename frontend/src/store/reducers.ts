import { combineReducers } from 'redux';
import chatHistoryReducer from './chatHistorySlice'; // Import your chat history reducer

const rootReducer = combineReducers({
  chatHistory: chatHistoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
