import axios from "axios";
import {
  GET_PRODUCTS,
  PRODUCTS_LOADING,
  PRODUCTS_ERROR,
  FILTER_PRODUCTS,
} from "../../contants/types";
const API_URL = import.meta.env.VITE_API_URL;
export const getProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  try {
    const res = await axios.get(`${API_URL}/products`);

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: { msg: err.response?.data?.msg || "Failed to fetch products" },
    });
  }
};

export const getFilteredProducts = (selectedCategories) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });

  try {
    let endpoint = `${API_URL}/products`;
    if (selectedCategories && selectedCategories.length > 0) {
      endpoint += `?pairs=${JSON.stringify(selectedCategories)}`;
    }

    const res = await axios.get(endpoint);

    dispatch({
      type: FILTER_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: err.response?.data?.msg || "Failed to fetch filtered products",
      },
    });
  }
};

export const getBestSellingProducts =
  (limit = 10) =>
  async (dispatch) => {
    dispatch({ type: PRODUCTS_LOADING });

    try {
      const res = await axios.get(
        `${API_URL}/products/bestselling?limit=${limit}`
      );

      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCTS_ERROR,
        payload: {
          msg:
            err.response?.data?.msg || "Failed to fetch best selling products",
        },
      });
    }
  };
