import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearPaymentState } from "./paymentSlice";
import { orderService } from "../../api/services/orderService";
import { paymentService } from "../../api/services/paymentService";

// 🟢 ORDER THUNKS
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await orderService.createOrder(orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to create order" });
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await orderService.getOrderById(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch order" });
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await orderService.getUserOrders(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch user orders" });
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentOrder: null,
    orders: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create order";
      })

      // get order by id
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch order";
      })

      // get user orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch user orders";
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

// 🟢 Checkout Process using both services
export const processCheckout = (orderData) => async (dispatch) => {
  try {
    const orderResponse = await dispatch(createOrder(orderData)).unwrap();
    const { _id: orderId, totalAmount } = orderResponse.order;

    if (orderData.paymentMethod === "razorpay") {
      await paymentService.createRazorpayOrder({ amount: totalAmount, orderId });
    } else {
      dispatch(clearPaymentState());
    }

    return orderResponse;
  } catch (error) {
    console.error("Checkout process failed:", error);
    throw error;
  }
}; 

export default orderSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { clearPaymentState, createRazorpayOrder } from "./paymentSlice";
// const API_URL = import.meta.env.VITE_API_URL;

// export const createOrder = createAsyncThunk(
//   "order/createOrder",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/orders`, orderData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getOrderById = createAsyncThunk(
//   "order/getOrderById",
//   async (orderId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/orders/${orderId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getUserOrders = createAsyncThunk(
//   "order/getUserOrders",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/orders/user/${userId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: "order",
//   initialState: {
//     currentOrder: null,
//     orders: [],
//     loading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     clearOrderState: (state) => {
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
    
//       .addCase(createOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.currentOrder = action.payload.order;
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to create order";
//       })
  
//       .addCase(getOrderById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getOrderById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentOrder = action.payload.order;
//       })
//       .addCase(getOrderById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to fetch order";
//       })
      
//       .addCase(getUserOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload.orders;
//       })
//       .addCase(getUserOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to fetch user orders";
//       });
//   },
// });

// export const { clearOrderState } = orderSlice.actions;

// export const processCheckout = (orderData) => async (dispatch) => {
//   try {
//     const orderResponse = await dispatch(createOrder(orderData)).unwrap();
//     const orderId = orderResponse.order._id;
//     const amount = orderResponse.order.totalAmount;

//     if (orderData.paymentMethod === "razorpay") {
//       await dispatch(createRazorpayOrder({ amount, orderId })).unwrap();
//     } else {
//       dispatch(clearPaymentState());
//       return orderResponse;
//     }

//     return orderResponse;
//   } catch (error) {
//     console.error("Checkout process failed:", error);
//     throw error;
//   }
// };

// export default orderSlice.reducer;
