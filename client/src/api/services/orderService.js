import axiosInstance from "../config/axiosInstance";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const orderService = {
  createOrder: async (orderData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.ORDER.CREATE, orderData);
    return response.data;
  },

  getOrderById: async (orderId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.ORDER.BY_ID(orderId));
    return response.data;
  },

  getUserOrders: async (userId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.ORDER.USER_ORDERS(userId));
    return response.data;
  },
};
