import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Fetch all feature images
export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",  // Updated the action type
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/common/feature/get`
    );
    return response.data;
  }
);

// Add a new feature image
export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage",  // Updated the action type
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

// Delete a feature image
export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",  // Updated the action type
  async (imageId, { dispatch }) => {

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/feature-images/${imageId}`
      ); 
      dispatch(removeFeatureImage(imageId));  // Dispatch the remove action to update the state
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    // Action to remove image from state
    removeFeatureImage: (state, action) => {
      state.featureImageList = state.featureImageList.filter(
        (image) => image._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getFeatureImages
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      // Handle addFeatureImage
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.featureImageList.push(action.payload); 
      });
  },
});

export const { removeFeatureImage } = commonSlice.actions;

export default commonSlice.reducer;
