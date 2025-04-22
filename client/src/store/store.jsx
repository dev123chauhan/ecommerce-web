import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../slice/WishlistSlice';
import authReducer from '../slice/AuthSlice';
import cartReducer from '../slice/CartSlice';
import productReducer from '../slice/ProductSlice';
import { productListReducer, productDetailsReducer } from '../reducers/ExploreProductReducers';
import productBannerReducer from '../slice/ProductBannerSlice';
import shopReducer from '../slice/ShopSlice';
import {shopApi} from '../slice/ShopApiSlice';
import paymentReducer from '../slice/PaymentSlice';
import orderReducer from "../slice/OrderSlice";
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