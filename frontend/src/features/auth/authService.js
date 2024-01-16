import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/users";

const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, user);
    // set user to localstorage
    localStorage.setItem("user", JSON.stringify(data.data));
    return data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.message ||
      err?.message ||
      err?.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export { register };
