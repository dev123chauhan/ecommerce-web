import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../../contants/exploreProductConstants";

import axiosInstance from "../../api/config/axiosInstance";
import { API_ENDPOINTS } from "../../api/config/apiEndpoints";

// ✅ Fetch all products
export const listProducts = (page = 1, limit = 8) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axiosInstance.get(API_ENDPOINTS.EXPLORE_PRODUCTS.LIST, {
      params: { page, limit },
    });

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response?.data?.message || error.message || "Failed to fetch products",
    });
  }
};

// ✅ Fetch product details by ID
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(API_ENDPOINTS.EXPLORE_PRODUCTS.DETAILS(id));

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data, // because backend returns { data: {...} }
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || "Failed to fetch product details",
    });
  }
};


// import axios from 'axios';
// import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../../contants/exploreProductConstants';
// const API_URL = import.meta.env.VITE_API_URL
// export const listProducts = (page = 1, limit = 8) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_LIST_REQUEST });

//     const { data } = await axios.get(`${API_URL}/exploreproducts?page=${page}&limit=${limit}`);

//     dispatch({
//       type: PRODUCT_LIST_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_LIST_FAIL,
//       payload: error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     });
//   }
// };

// export const listProductDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_DETAILS_REQUEST });

//     const { data } = await axios.get(`${API_URL}/exploreproducts/${id}`);

//     dispatch({
//       type: PRODUCT_DETAILS_SUCCESS,
//       payload: data.data
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_DETAILS_FAIL,
//       payload: error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     });
//   }
// };