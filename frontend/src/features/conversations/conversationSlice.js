import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typing: [],
};

const conversationSlice = createSlice({
  name: "conversationReducer",
  initialState,
  reducers: {
    startTyping: (state, action) => {
      if (
        !state.typing.find((el) => el.senderId === action.payload?.senderId)
      ) {
        state.typing = [...state.typing, action.payload];
      }
    },
    stopTyping: (state, action) => {
      state.typing = state.typing.filter(
        (el) => el?.senderId !== action.payload,
      );
    },
  },
});

export default conversationSlice;

export const { startTyping, stopTyping } = conversationSlice.actions;
