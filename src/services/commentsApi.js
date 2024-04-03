import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

// API slice called commentsApi
export const commentsApi = createApi({
  // Define reducer slice name
  reducerPath: "commentsApi",
  // Base query function for making HTTP requests
  baseQuery: baseQueryWithAuth,
  // Define API endpoints
  endpoints: (builder) => ({
    // getComments: builder.query({
    //   queryFn: (postId) => ({
    //     url: `posts/${postId}/comments`,
    //     // Filter comments with postId less than 30
    //     transformResponse: (response) => {
    //       return {
    //         data: response.filter((comment) => comment.postId <= 30),
    //       };
    //     },
    //   }),
    // }),
    getComments: builder.query({
      query: (postId) => ({
        url: `posts/${postId}/comments`,
      }),
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        // Dynamic URL with postId
        url: `posts/${newComment.postId}/comments`,
        method: "POST",
        body: newComment,
      }),
    }),
  }),
});
export const { getComments } = commentsApi.endpoints;
export const { useAddCommentMutation, useGetCommentsQuery } = commentsApi;
