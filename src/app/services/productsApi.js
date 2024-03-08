import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

// API slice called productsApi
export const productsApi = createApi({
  // Define reducer slice name
  reducerPath: "productsApi",
  // Base query function for making HTTP requests
  baseQuery: baseQueryWithAuth,
  // Define API endpoints
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products/add",
        method: "POST",
        body: newProduct,
      }),
    }),
  }),
});



export const { getProducts } = productsApi.endpoints;

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
} = productsApi;
