import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const checkIn = createAsyncThunk("att/checkIn", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post("/attendance/check-in");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const checkOut = createAsyncThunk("att/checkOut", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post("/attendance/check-out");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const getDashboard = createAsyncThunk("att/getDashboard", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/attendance/dashboard");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const getMyHistory = createAsyncThunk("att/getHistory", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/attendance/history");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const getReports = createAsyncThunk("att/getReports", async ({ start, end, userId }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/attendance/reports?start=${start}&end=${end}&userId=${userId}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

const slice = createSlice({
  name: "attendance",
  initialState: { dashboard: {}, history: [], reports: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.fulfilled, (state, action) => { state.dashboard = action.payload; })
      .addCase(getMyHistory.fulfilled, (state, action) => { state.history = action.payload; })
      .addCase(getReports.fulfilled, (state, action) => { state.reports = action.payload; });
  }
});

export default slice.reducer;
