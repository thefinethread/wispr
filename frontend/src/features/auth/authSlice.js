import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  hasError: false,
  success: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
