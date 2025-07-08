import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { page = 1, limit = 10, category, minPrice, maxPrice },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${baseUrl}/products`, {
        params: { page, limit, category, minPrice, maxPrice },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    totalPages: 0,
    currentPage: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    filterProducts: (state, action) => {
      const { searchTerm, selectedCategories, selectedSubCategories } =
        action.payload;
      state.filteredItems = state.items.filter((product) => {
        const matchesSearch =
          !searchTerm ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          (selectedCategories.length === 0 &&
            selectedSubCategories.length === 0) ||
          selectedCategories.includes(product.category) ||
          selectedSubCategories.includes(product.subCategory);

        return matchesSearch && matchesCategory;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { filterProducts } = productSlice.actions;
export default productSlice.reducer;
