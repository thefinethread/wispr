import { createSlice } from "@reduxjs/toolkit";
import { register } from "./authService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  hasError: false,
  success: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload;
        state.success = false;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
