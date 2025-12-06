import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const loginUser = createAsyncThunk("auth/login", async (creds, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", creds);
    if (res.data.token) localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Login failed" });
  }
});

export const registerUser = createAsyncThunk("auth/register", async (form, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/register", form);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Register failed" });
  }
});

const slice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // user registered; front may navigate to login
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
