"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { Avatar, Box, Paper, Typography } from "@mui/material";

import { selectBlogById } from "@/features/blogsSlice";
import { selectNameById } from "@/features/usersSlice";
import CommentForm from "../comments/CommentForm";

const BlogSingle = () => {
  const { id } = useParams();
  const blog = useSelector(selectBlogById(id));
  const authorName = useSelector(selectNameById(blog.userId));

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <Paper
      sx={{
        position: "relative",
        mb: 4,
        p: 2,
        textAlign: "center",
      }}
    >
      <Typography component="h1" variant="h3" color="inherit" gutterBottom>
        {blog.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Avatar
          alt={authorName}
          src="/assets/author.jpg"
          sx={{ width: 70, height: 70 }}
        />
        <Typography variant="subtitle1" color="inherit" sx={{ ml: 1 }}>
          {authorName}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <img
          src={blog.thumbnail ? blog.thumbnail : "/assets/blog-thumbnail.jpg"}
          alt={blog.title}
          className="max-w-full h-auto rounded-lg text-center"
        />
        <Typography
          variant="body1"
          color="inherit"
          paragraph
          sx={{ mt: 2, width: "80%" }}
        >
          {blog.body}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
        <CommentForm blogId={blog.id}  />
      </Box>
    </Paper>
  );
};

export default BlogSingle;
