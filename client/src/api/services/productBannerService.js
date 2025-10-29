import axiosInstance from '../config/axiosInstance';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export const productBannerService = {
  // Fetch all product banners
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCT_BANNER.LIST);
    return response.data;
  },

  // Fetch featured product banners
  getFeatured: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCT_BANNER.FEATURED);
    return response.data;
  },

  // Fetch a single product banner by ID
  getById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCT_BANNER.DETAILS(id));
    return response.data;
  },
};
