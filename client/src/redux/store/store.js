import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../slice/wishlistSlice';
import authReducer from '../slice/authSlice';
import cartReducer from '../slice/cartSlice';
import productReducer from '../slice/productSlice';
import productBannerReducer from '../slice/productBannerSlice';
import shopReducer from '../slice/shopSlice';
import {shopApi} from '../slice/shopApiSlice';
import paymentReducer from '../slice/paymentSlice';
import orderReducer from "../slice/orderSlice";
import { productDetailsReducer, productListReducer } from '../reducers/exploreProductReducers';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    products: productReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productBanner: productBannerReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    shop: shopReducer,
    payment: paymentReducer, 
    order: orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware)
});