import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;
export const toggleWishlistItem = createAsyncThunk(
  'wishlist/toggleItem',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/wishlist/toggle`, {
        userId,
        productId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
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
      const response = await axios.get(`${baseUrl}/wishlist/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
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
      await axios.delete(`${baseUrl}/wishlist/${userId}/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
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