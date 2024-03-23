import { selectToken } from "@/features/usersSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_HOST;

// Base query function to include authentication headers
export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl,
  // Include headers in each request
  prepareHeaders: (headers, { getState, method, url }) => {
    try {
      // Only add auth header for requests other than POST to the login endpoint
      if (!(method === "POST" && url.includes("/auth/login"))) {
      const authToken = selectToken(getState());
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }
    return headers;
  },
});
