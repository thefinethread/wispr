import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    removeUserInfo: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    updateUserInfo: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
  },
});

export default authSlice.reducer;

export const { saveUserInfo, removeUserInfo, updateUserInfo } =
  authSlice.actions;
