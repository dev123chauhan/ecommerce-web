import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../../redux/slice/WishlistSlice';
import authReducer from '../../redux/slice/AuthSlice';
import cartReducer from '../../redux/slice/CartSlice';
import productReducer from '../../redux/slice/ProductSlice';
import { productListReducer, productDetailsReducer } from '../../redux/reducers/ExploreProductReducers';
import productBannerReducer from '../../redux/slice/ProductBannerSlice';
import shopReducer from '../../redux/slice/ShopSlice';
import {shopApi} from '../../redux/slice/ShopApiSlice';
import paymentReducer from '../../redux/slice/PaymentSlice';
import orderReducer from "../../redux/slice/OrderSlice";
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