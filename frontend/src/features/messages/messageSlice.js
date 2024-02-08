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
      const { message, newChat } = action.payload;

      if (newChat) {
        state.conversationId = message?.conversationId;
        state.messages.push(message);
      } else {
        if (state.conversationId === message?.conversationId) {
          state.messages.push(message);
        }
      }
    },
  },
});

export default messageSlice;

export const { newMessage, getMessages, typing } = messageSlice.actions;
