import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
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
  },
});

export default messageSlice;

export const { newMessage, getMessages } = messageSlice.actions;
