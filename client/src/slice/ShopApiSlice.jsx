// client/src/features/products/productApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Shop', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/shop',
      providesTags: ['Shop']
    }),
    getProductById: builder.query({
      query: (id) => `/shop/${id}`,
      providesTags: (result, error, id) => [{ type: 'Shop', id }]
    }),
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Categories']
    }),
    searchProducts: builder.query({
      query: (params) => {
        const { searchTerm, categories, subCategories } = params;
        let queryString = '/shop/search?';
        
        if (searchTerm) {
          queryString += `searchTerm=${searchTerm}&`;
        }
        
        if (categories && categories.length > 0) {
          categories.forEach(category => {
            queryString += `category=${category}&`;
          });
        }
        
        if (subCategories && subCategories.length > 0) {
          subCategories.forEach(subCategory => {
            queryString += `subCategory=${subCategory}&`;
          });
        }
        
        return queryString;
      },
      providesTags: ['Shop']
    })
  })
});

export const { 
  useGetProductsQuery, 
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useSearchProductsQuery
} = shopApi;