import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationId: "",
  messages: [],
};

const messageSlice = createSlice({
  name: "messageReducer",
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload.data;
      state.conversationId = action.payload.conversationId;
    },
    newMessage: (state, action) => {
      if (state.conversationId === action.payload?.conversationId) {
        state.messages = [...state.messages, action.payload];
      }
    },
  },
});

export default messageSlice;

export const { newMessage, getMessages, typing } = messageSlice.actions;
