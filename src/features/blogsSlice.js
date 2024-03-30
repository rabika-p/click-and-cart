import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateBlog: (state, action) => {
      const updatedBlogIndex = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (updatedBlogIndex !== -1) {
        state.blogs[updatedBlogIndex] = action.payload;
      }
    },
  },
});

export const { addBlog, setBlogs, deleteBlog, updateBlog } = blogsSlice.actions;

export default blogsSlice.reducer;

export const selectBlogs = (state) => state.blogs.blogs;

export const selectBlogById = (id) => (state) =>
  state.blogs.blogs.find((blog) => blog.id === parseInt(id));
