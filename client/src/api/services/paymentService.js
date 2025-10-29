import axiosInstance from "../config/axiosInstance";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const paymentService = {
  createRazorpayOrder: async ({ amount, orderId }) => {
    const response = await axiosInstance.post(API_ENDPOINTS.PAYMENT.CREATE_ORDER, {
      amount,
      currency: "INR",
      receipt: orderId,
      notes: {
        paymentFor: "E-commerce purchase",
      },
    });
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.PAYMENT.VERIFY, paymentData);
    return response.data;
  },

  getRazorpayKey: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENT.GET_KEY);
    return response.data;
  },
};
