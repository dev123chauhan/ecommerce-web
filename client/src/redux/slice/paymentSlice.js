import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paymentService } from "../../api/services/paymentService";

// ✅ Create Razorpay Order
export const createRazorpayOrder = createAsyncThunk(
  "payment/createRazorpayOrder",
  async ({ amount, orderId }, { rejectWithValue }) => {
    try {
      const data = await paymentService.createRazorpayOrder({ amount, orderId });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to create payment order" });
    }
  } 
);

// ✅ Verify Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const data = await paymentService.verifyPayment(paymentData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Payment verification failed" });
    }
  }
);

// ✅ Get Razorpay Key
export const getRazorpayKey = createAsyncThunk(
  "payment/getRazorpayKey",
  async (_, { rejectWithValue }) => {
    try {
      const data = await paymentService.getRazorpayKey();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch Razorpay key" });
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
        state.error = action.payload?.message;
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
        state.error = action.payload?.message;
      })

      // Get Razorpay key
      .addCase(getRazorpayKey.fulfilled, (state, action) => {
        state.razorpayKey = action.payload.key;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const API_URL = import.meta.env.VITE_API_URL;

// export const createRazorpayOrder = createAsyncThunk(
//   "payment/createRazorpayOrder",
//   async ({ amount, orderId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/payment/create-order`, {
//         amount,
//         currency: "INR",
//         receipt: orderId,
//         notes: {
//           paymentFor: "E-commerce purchase",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const verifyPayment = createAsyncThunk(
//   "payment/verifyPayment",
//   async (paymentData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/payment/verify`,
//         paymentData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getRazorpayKey = createAsyncThunk(
//   "payment/getRazorpayKey",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/payment/get-key`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const paymentSlice = createSlice({
//   name: "payment",
//   initialState: {
//     razorpayKey: "",
//     razorpayOrder: null,
//     paymentVerified: false,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearPaymentState: (state) => {
//       state.razorpayOrder = null;
//       state.paymentVerified = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       .addCase(createRazorpayOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createRazorpayOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.razorpayOrder = action.payload.order;
//       })
//       .addCase(createRazorpayOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to create order";
//       })

//       .addCase(verifyPayment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyPayment.fulfilled, (state) => {
//         state.loading = false;
//         state.paymentVerified = true;
//       })
//       .addCase(verifyPayment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Payment verification failed";
//       })

//       .addCase(getRazorpayKey.fulfilled, (state, action) => {
//         state.razorpayKey = action.payload.key;
//       });
//   },
// });

// export const { clearPaymentState } = paymentSlice.actions;
// export default paymentSlice.reducer;
