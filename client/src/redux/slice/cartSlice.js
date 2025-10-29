import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // adjust path if needed
import { cartService } from '../../api/services/cartService';

const calculateTotalQuantity = (items = []) => {
  return items.reduce((total, item) => total + (item.quantity || 0), 0);
};

const handleAsyncError = (error) => {
  const message = error.response?.data?.message || error.message || 'An error occurred';
  throw new Error(message);
};

const saveCartToStorage = (cartData) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartData));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return { items: [], totalAmount: 0, totalQuantity: 0 };
};

// ✅ Using services
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  try {
    return await cartService.fetchCart(userId);
  } catch (error) {
    return handleAsyncError(error);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, product }) => {
  try {
    return await cartService.addToCart(userId, product);
  } catch (error) {
    return handleAsyncError(error);
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ userId, productId }) => {
  try {
    return await cartService.removeFromCart(userId, productId);
  } catch (error) {
    return handleAsyncError(error);
  }
});

export const updateCartQuantity = createAsyncThunk('cart/updateQuantity', async ({ userId, productId, action }) => {
  try {
    return await cartService.updateCartQuantity(userId, productId, action);
  } catch (error) {
    return handleAsyncError(error);
  }
});

// ✅ Helper reducers
const updateCartState = (state, action) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload.items || [];
  state.totalAmount = action.payload.totalAmount || 0;
  state.totalQuantity = calculateTotalQuantity(action.payload.items);

  saveCartToStorage({
    items: state.items,
    totalAmount: state.totalAmount,
    totalQuantity: state.totalQuantity,
  });
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const initialCartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialCartState.items,
    totalAmount: initialCartState.totalAmount,
    totalQuantity: initialCartState.totalQuantity,
    loading: false,
    error: null,
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
      localStorage.removeItem('cart');
    },
    syncCartFromServer: (state, action) => {
      state.items = action.payload.items || [];
      state.totalAmount = action.payload.totalAmount || 0;
      state.totalQuantity = calculateTotalQuantity(action.payload.items);

      saveCartToStorage({
        items: state.items,
        totalAmount: state.totalAmount,
        totalQuantity: state.totalQuantity,
      });
    },
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
      .addCase(removeFromCart.rejected, handleRejected)

      .addCase(updateCartQuantity.pending, handlePending)
      .addCase(updateCartQuantity.fulfilled, updateCartState)
      .addCase(updateCartQuantity.rejected, handleRejected);
  },
});

export const { clearCartError, resetCart, syncCartFromServer } = cartSlice.actions;
export default cartSlice.reducer;









// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const calculateTotalQuantity = (items = []) => {
//   return items.reduce((total, item) => total + (item.quantity || 0), 0);
// };

// const BASE_URL = import.meta.env.VITE_API_URL;

// const handleAsyncError = (error) => {
//   const message = error.response?.data?.message || error.message || 'An error occurred';
//   throw new Error(message);
// };

// const saveCartToStorage = (cartData) => {
//   try {
//     localStorage.setItem('cart', JSON.stringify(cartData));
//   } catch (error) {
//     console.error('Failed to save cart to localStorage:', error);
//   }
// };

// const loadCartFromStorage = () => {
//   try {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       return JSON.parse(savedCart);
//     }
//   } catch (error) {
//     console.error('Failed to load cart from localStorage:', error);
//   }
//   return {
//     items: [],
//     totalAmount: 0,
//     totalQuantity: 0
//   };
// };

// export const fetchCart = createAsyncThunk(
//   'cart/fetchCart',
//   async (userId) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/cart/${userId}`);
//       return response.data;
//     } catch (error) {
//       return handleAsyncError(error);
//     }
//   }
// );

// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async ({ userId, product }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/cart/${userId}/add`, product);
//       return response.data;
//     } catch (error) {
//       return handleAsyncError(error);
//     }
//   }
// );

// export const removeFromCart = createAsyncThunk(
//   'cart/removeFromCart',
//   async ({ userId, productId }) => {
//     try {
//       const response = await axios.delete(`${BASE_URL}/cart/${userId}/remove/${productId}`);
//       return response.data;
//     } catch (error) {
//       return handleAsyncError(error);
//     }
//   }
// );

// // New thunk for updating quantity
// export const updateCartQuantity = createAsyncThunk(
//   'cart/updateQuantity',
//   async ({ userId, productId, action }) => {
//     try {
//       const response = await axios.patch(
//         `${BASE_URL}/cart/${userId}/update/${productId}`,
//         { action }
//       );
//       return response.data;
//     } catch (error) {
//       return handleAsyncError(error);
//     }
//   }
// );

// const updateCartState = (state, action) => {
//   state.loading = false;
//   state.error = null;
//   state.items = action.payload.items || [];
//   state.totalAmount = action.payload.totalAmount || 0;
//   state.totalQuantity = calculateTotalQuantity(action.payload.items);

//   saveCartToStorage({
//     items: state.items,
//     totalAmount: state.totalAmount,
//     totalQuantity: state.totalQuantity
//   });
// };

// const handlePending = (state) => {
//   state.loading = true;
//   state.error = null;
// };

// const handleRejected = (state, action) => {
//   state.loading = false;
//   state.error = action.error.message;
// };

// const initialCartState = loadCartFromStorage();

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: initialCartState.items,
//     totalAmount: initialCartState.totalAmount,
//     totalQuantity: initialCartState.totalQuantity,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     clearCartError: (state) => {
//       state.error = null;
//     },
//     resetCart: (state) => {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalQuantity = 0;
//       state.loading = false;
//       state.error = null;
//       localStorage.removeItem('cart');
//     },
//     syncCartFromServer: (state, action) => {
//       state.items = action.payload.items || [];
//       state.totalAmount = action.payload.totalAmount || 0;
//       state.totalQuantity = calculateTotalQuantity(action.payload.items);

//       saveCartToStorage({
//         items: state.items,
//         totalAmount: state.totalAmount,
//         totalQuantity: state.totalQuantity
//       });
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, handlePending)
//       .addCase(fetchCart.fulfilled, updateCartState)
//       .addCase(fetchCart.rejected, handleRejected)
      
//       .addCase(addToCart.pending, handlePending)
//       .addCase(addToCart.fulfilled, updateCartState)
//       .addCase(addToCart.rejected, handleRejected)
      
//       .addCase(removeFromCart.pending, handlePending)
//       .addCase(removeFromCart.fulfilled, updateCartState)
//       .addCase(removeFromCart.rejected, handleRejected)
      
//       // Handle updateCartQuantity
//       .addCase(updateCartQuantity.pending, handlePending)
//       .addCase(updateCartQuantity.fulfilled, updateCartState)
//       .addCase(updateCartQuantity.rejected, handleRejected);
//   }
// });

// export const { clearCartError, resetCart, syncCartFromServer } = cartSlice.actions;
// export default cartSlice.reducer;