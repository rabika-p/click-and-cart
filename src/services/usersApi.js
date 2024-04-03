import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

// API slice called usersAPI
export const usersApi = createApi({
  // Define reducer slice name
  reducerPath: "usersApi",
  // Base query function for making HTTP requests
  baseQuery: baseQueryWithAuth,
  // Define API endpoints
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Specify req.body
        body: loginData,
      }),
    }),

    getUserById: builder.query({
      query: (userId) => `users/${userId}`,
    }),
  }),
});
export const { login, getUserById } = usersApi.endpoints;
export const { useLoginMutation, useGetUserByIdQuery } = usersApi;
