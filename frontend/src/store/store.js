import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "../features/apiSlice";
import messageSlice from "../features/messages/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [messageSlice.reducerPath]: messageSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
});

export default store;
