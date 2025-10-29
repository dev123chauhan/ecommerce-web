export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/users/login",
    REGISTER: "/users/register",
    LOGOUT: "/users/logout",
    REFRESH_TOKEN: "/users/refresh-token",
  },
  USER: {
    PROFILE: "/users/profile",
    DELETE_ACCOUNT: "/users/delete-account",
  },
  PRODUCTS: {
    LIST: "/products",
  },
  EXPLORE_PRODUCTS: {
    LIST: "/exploreproducts",
    DETAILS: (id) => `/exploreproducts/${id}`,
  },
    CART: {
    FETCH: (userId) => `/cart/${userId}`,
    ADD: (userId) => `/cart/${userId}/add`,
    REMOVE: (userId, productId) => `/cart/${userId}/remove/${productId}`,
    UPDATE: (userId, productId) => `/cart/${userId}/update/${productId}`,
  },
    ORDER: {
    CREATE: "/orders",
    BY_ID: (orderId) => `/orders/${orderId}`,
    USER_ORDERS: (userId) => `/orders/user/${userId}`,
  },
  PAYMENT: {
    CREATE_ORDER: "/payment/create-order",
    VERIFY: "/payment/verify",
    GET_KEY: "/payment/get-key",
  },
  PRODUCT_BANNER: {
    LIST: "/productbanner",
    FEATURED: "/productbanner",
    DETAILS: (id) => `/productbanner/${id}`,
  },
    CONTACT: {
    SEND: "/contact",
  },
};
