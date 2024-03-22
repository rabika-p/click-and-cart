import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

// API slice called blogsApi
export const blogsApi = createApi({
  // Define reducer slice name
  reducerPath: "blogsApi",
  // Base query function for making HTTP requests
  baseQuery: baseQueryWithAuth,
  // Define API endpoints
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "posts",
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "posts/add",
        method: "POST",
        body: newBlog,
      }),
    }),
  }),
});

export const { getBlogs } = blogsApi.endpoints;

export const { useGetBlogsQuery, useDeleteBlogMutation, useAddBlogMutation } =
  blogsApi;

