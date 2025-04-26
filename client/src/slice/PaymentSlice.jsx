// src/slice/PaymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Razorpay order
export const createRazorpayOrder = createAsyncThunk(
  "payment/createRazorpayOrder",
  async ({ amount, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/payment/create-order", {
        amount,
        currency: "INR",
        receipt: orderId,
        notes: {
          paymentFor: "E-commerce purchase",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Verify payment after completion
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/payment/verify", paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Razorpay API key
export const getRazorpayKey = createAsyncThunk(
  "payment/getRazorpayKey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/payment/get-key");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    razorpayKey: "",
    razorpayOrder: null,
    paymentVerified: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.razorpayOrder = null;
      state.paymentVerified = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Razorpay order
      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayOrder = action.payload.order;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create order";
      })
      // Verify payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.paymentVerified = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Payment verification failed";
      })
      // Get Razorpay key
      .addCase(getRazorpayKey.fulfilled, (state, action) => {
        state.razorpayKey = action.payload.key;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;