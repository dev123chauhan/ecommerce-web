import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategories: [],
  selectedSubCategories: [],
  searchTerm: "",
  filteredProducts: [],
  allProducts: [],
};

export const shopSlice = createSlice({
  name: "Shop",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.allProducts = action.payload;
      // Apply current filters
      state.filteredProducts = filterProductsHelper(
        action.payload,
        state.searchTerm,
        state.selectedCategories,
        state.selectedSubCategories
      );
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredProducts = filterProductsHelper(
        state.allProducts,
        action.payload,
        state.selectedCategories,
        state.selectedSubCategories
      );
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
      state.filteredProducts = filterProductsHelper(
        state.allProducts,
        state.searchTerm,
        action.payload,
        state.selectedSubCategories
      );
    },
    setSelectedSubCategories: (state, action) => {
      state.selectedSubCategories = action.payload;
      state.filteredProducts = filterProductsHelper(
        state.allProducts,
        state.searchTerm,
        state.selectedCategories,
        action.payload
      );
    },
    filterProducts: (state) => {
      state.filteredProducts = filterProductsHelper(
        state.allProducts,
        state.searchTerm,
        state.selectedCategories,
        state.selectedSubCategories
      );
    },
  },
});

const filterProductsHelper = (
  shop,
  searchTerm,
  selectedCategories,
  selectedSubCategories
) => {
  return shop.filter((product) => {
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      (selectedCategories.length === 0 && selectedSubCategories.length === 0) ||
      selectedCategories.includes(product.category) ||
      selectedSubCategories.includes(product.subCategory);

    return matchesSearch && matchesCategory;
  });
};

export const {
  setProducts,
  setSearchTerm,
  setSelectedCategories,
  setSelectedSubCategories,
  filterProducts,
} = shopSlice.actions;

export default shopSlice.reducer;
