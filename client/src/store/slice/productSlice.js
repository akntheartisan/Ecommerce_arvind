import client from "@/config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productFetch = createAsyncThunk(
  "product/Fetch",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await client.get("/product");
      console.log("product",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: null,
    loading: false,
    error: null,
    success: false,
  },
  extraReducers: (builder) => {
    builder

      .addCase(productFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload;
      })
      .addCase(productFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer;