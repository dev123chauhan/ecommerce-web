import axiosInstance from '../config/axiosInstance';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export const cartService = {
  fetchCart: async (userId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.CART.FETCH(userId));
    return response.data;
  },

  addToCart: async (userId, product) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CART.ADD(userId),
      product
    );
    return response.data;
  },

  removeFromCart: async (userId, productId) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.CART.REMOVE(userId, productId)
    );
    return response.data;
  },

  updateCartQuantity: async (userId, productId, action) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.CART.UPDATE(userId, productId),
      { action }
    );
    return response.data;
  },
};
