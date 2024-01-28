import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "../features/apiSlice";
import messageSlice from "../features/messages/messageSlice";
import conversationSlice from "../features/conversations/conversationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [messageSlice.reducerPath]: messageSlice.reducer,
    [conversationSlice.reducerPath]: conversationSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
});

export default store;
