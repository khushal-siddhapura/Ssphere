import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch top products from the API
export const fetchTopProducts = createAsyncThunk(
  "topProducts/fetchTopProducts",
  async () => {
    const response = await fetch(
      "https://ssphere.onrender.com/api/topproducts"
    );
    const data = await response.json();
    return data;
  }
);

// Create the slice
const topProductsSlice = createSlice({
  name: "topProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default topProductsSlice.reducer;
