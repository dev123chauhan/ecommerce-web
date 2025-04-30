import { GET_PRODUCTS, PRODUCTS_LOADING, PRODUCTS_ERROR, FILTER_PRODUCTS } from '../action/types';

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        loading: false,
        error: null
      };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
        loading: false,
        error: null
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}