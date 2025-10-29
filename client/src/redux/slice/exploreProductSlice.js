import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/config/axiosInstance';
import { API_ENDPOINTS } from '../../api/config/apiEndpoints';
// ✅ Fetch Explore Products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.EXPLORE_PRODUCTS.LIST, {
        params: { page, limit: 8 },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);

const exploreproductsSlice = createSlice({
  name: 'exploreproducts',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Pending
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // ✅ Fulfilled
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      // ❌ Rejected
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = exploreproductsSlice.actions;
export default exploreproductsSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URL
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (page = 1, thunkAPI) => {
//     try {
//       const res = await axios.get(`${API_URL}/exploreproducts?page=${page}&limit=8`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

// const exploreproductsSlice = createSlice({
//   name: 'exploreproducts',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//     currentPage: 1,
//     totalPages: 1,
//   },
//   reducers: {
//     setPage: (state, action) => {
//       state.currentPage = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.items = action.payload.data;
//         state.totalPages = action.payload.totalPages;
//         state.currentPage = action.payload.currentPage;
//         state.loading = false;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       });
//   },
// });

// export const { setPage } = exploreproductsSlice.actions;
// export default exploreproductsSlice.reducer;
