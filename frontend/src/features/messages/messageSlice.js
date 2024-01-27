import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  typing: "",
};

const messageSlice = createSlice({
  name: "messageReducer",
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.messages = [...action.payload];
    },
    newMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    typing: (state, action) => {
      state.typing = action.payload;
    },
  },
});

export default messageSlice;

export const { newMessage, getMessages, typing } = messageSlice.actions;
