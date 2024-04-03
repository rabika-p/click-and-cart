import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});

export const selectCommentsByBlogId = (blogId) => (state) => {
  const comments = state.comments?.comments;
  if (!comments) {
    return [];
  }
  return comments.filter((comment) => comment.postId === parseInt(blogId));
};

export const { addComment, setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
