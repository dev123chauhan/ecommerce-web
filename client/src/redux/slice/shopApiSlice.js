import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_URL;
export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Shop", "Categories"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/shop",
      providesTags: ["Shop"],
    }),
    getProductById: builder.query({
      query: (id) => `/shop/${id}`,
      providesTags: (id) => [{ type: "Shop", id }],
    }),
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    searchProducts: builder.query({
      query: (params) => {
        const { searchTerm, categories, subCategories } = params;
        let queryString = "/shop/search?";

        if (searchTerm) {
          queryString += `searchTerm=${searchTerm}&`;
        }

        if (categories && categories.length > 0) {
          categories.forEach((category) => {
            queryString += `category=${category}&`;
          });
        }

        if (subCategories && subCategories.length > 0) {
          subCategories.forEach((subCategory) => {
            queryString += `subCategory=${subCategory}&`;
          });
        }

        return queryString;
      },
      providesTags: ["Shop"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useSearchProductsQuery,
} = shopApi;
