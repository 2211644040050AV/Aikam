// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const mergeCart = createAsyncThunk(
  'cart/mergeCart',
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      // Replace with your actual backend API route
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ guestId })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {
    // other cart actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default cartSlice.reducer;
