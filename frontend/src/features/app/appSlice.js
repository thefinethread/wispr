import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentConversation: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setCurrentConversation } = appSlice.actions;
