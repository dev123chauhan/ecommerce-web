import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const calculateTotalQuantity = (items = []) => {
  return items.reduce((total, item) => total + (item.quantity || 0), 0);
};


const BASE_URL = import.meta.env.VITE_API_URL;


const handleAsyncError = (error) => {
  const message = error.response?.data?.message || error.message || 'An error occurred';
  throw new Error(message);
};


export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      return response.data;
    } catch (error) {
      return handleAsyncError(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, product }) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart/${userId}/add`, product);
      return response.data;
    } catch (error) {
      return handleAsyncError(error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/${userId}/remove/${productId}`);
      return response.data;
    } catch (error) {
      return handleAsyncError(error);
    }
  }
);


const updateCartState = (state, action) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload.items || [];
  state.totalAmount = action.payload.totalAmount || 0;
  state.totalQuantity = calculateTotalQuantity(action.payload.items);
};


const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};


const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    loading: false,
    error: null
  },
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, updateCartState)
      .addCase(fetchCart.rejected, handleRejected)
      

      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, updateCartState)
      .addCase(addToCart.rejected, handleRejected)
      

      .addCase(removeFromCart.pending, handlePending)
      .addCase(removeFromCart.fulfilled, updateCartState)
      .addCase(removeFromCart.rejected, handleRejected);
  }
});

export const { clearCartError, resetCart } = cartSlice.actions;
export default cartSlice.reducer;