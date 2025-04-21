// src/slice/WishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const toggleWishlistItem = createAsyncThunk(
  'wishlist/toggleItem',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/wishlist/toggle', {
        userId,
        productId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if using authentication
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchItems',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/wishlist/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if using authentication
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeItem',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/api/wishlist/${userId}/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if using authentication
        }
      });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(toggleWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.productId._id !== action.payload);
      });
  }
});

export default wishlistSlice.reducer;