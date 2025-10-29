import axiosInstance from "../config/axiosInstance";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const contactService = {
  sendMessage: async (contactData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.CONTACT.SEND, contactData);
    return response.data;
  },
};
