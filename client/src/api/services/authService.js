import axiosInstance from '../config/axiosInstance';
import { API_ENDPOINTS } from '../config/apiEndpoints';
export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },
  register: async (userData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
  getProfile: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },
   deleteAccount: async () => {
    const response = await axiosInstance.delete(API_ENDPOINTS.USER.DELETE_ACCOUNT);
    return response.data;
  },
};