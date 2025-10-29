import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productBannerService } from '../../api/services/productBannerService';

export const fetchProducts = createAsyncThunk(
  'productbanner/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productBannerService.getAll();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'productbanner/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productBannerService.getFeatured();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'productbanner/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      return await productBannerService.getById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productBannerSlice = createSlice({
  name: 'productbanner',
  initialState: {
    products: [],
    featuredProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentProduct } = productBannerSlice.actions;
export default productBannerSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const baseUrl = import.meta.env.VITE_API_URL;
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${baseUrl}/productbanner`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
 
// export const fetchFeaturedProducts = createAsyncThunk(
//   'products/fetchFeaturedProducts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${baseUrl}/productbanner`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchProductById = createAsyncThunk(
//   'products/fetchProductById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${baseUrl}/productbanner/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const productBannerSlice = createSlice({
//   name: 'productbanner',
//   initialState: {
//     products: [],
//     featuredProducts: [],
//     currentProduct: null,
//     loading: false,
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch products';
//       })
      

//       .addCase(fetchFeaturedProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.featuredProducts = action.payload;
//       })
//       .addCase(fetchFeaturedProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch featured products';
//       })
      
//       .addCase(fetchProductById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentProduct = action.payload;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch product';
//       });
//   }
// });

// export default productBannerSlice.reducer;

