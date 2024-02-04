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

    updateOtherUserInCurrentConversation: (state, action) => {
      if (
        state.currentConversation &&
        state.currentConversation?.otherUser?._id === action.payload._id
      ) {
        const { otherUser, ...rest } = state.currentConversation;

        state.currentConversation = {
          ...rest,
          otherUser: { ...otherUser, ...action.payload },
        };
      }
    },
  },
});

export default appSlice.reducer;

export const { setCurrentConversation, updateOtherUserInCurrentConversation } =
  appSlice.actions;
