import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/admin/complaints`;

// Fetch all complaints for admin
export const fetchAllComplaints = createAsyncThunk(
  "complaints/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      console.log('Fetched complaints:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching complaints:', error);
      return rejectWithValue(error.response?.data || "Error fetching complaints");
    }
  }
);

// Fetch complaint details by ID
export const fetchComplaintById = createAsyncThunk(
  "complaints/fetchById",
  async (complaintId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${complaintId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching complaint details");
    }
  }
);

const complaintSlice = createSlice({
  name: "complaints",
  initialState: {
    complaintList: [],
    complaintDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetComplaintDetails: (state) => {
      state.complaintDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllComplaints
      .addCase(fetchAllComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaintList = action.payload;
      })
      .addCase(fetchAllComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchComplaintById
      .addCase(fetchComplaintById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaintById.fulfilled, (state, action) => {
        state.loading = false;
        state.complaintDetails = action.payload;
      })
      .addCase(fetchComplaintById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetComplaintDetails } = complaintSlice.actions;
export default complaintSlice.reducer;
