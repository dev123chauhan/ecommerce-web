import axiosInstance from "../config/axiosInstance";
import { API_ENDPOINTS } from "../config/apiEndpoints";
export const productService = {
  fetchProducts: async ({ page = 1, limit = 10, category, minPrice, maxPrice }) => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.LIST, {
      params: { page, limit, category, minPrice, maxPrice },
    });
    return response.data;
  },
};
