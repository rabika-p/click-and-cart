"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import { BlogCard } from "@/components/blogs/BlogCard";
import { showToast } from "@/components/login/Toast";

import { useGetBlogsQuery } from "@/services/blogsApi";
import withAuth from "@/hoc/withAuth";

import { deleteBlog, selectBlogs, setBlogs } from "@/features/blogsSlice";
import { selectUserId } from "@/features/usersSlice";

import AuthLayout from "../../layouts/authLayout";

const MyPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogs = useSelector(selectBlogs);
  const userId = useSelector(selectUserId);

  const itemsPerPage = 9;

  // Filter blogs based on the logged-in user's userId
  const userBlogs = blogs.filter((blog) => blog.userId === userId);
  const sortedBlogs = [...userBlogs].sort((a, b) => b.id - a.id);

  // Paginate user's blogs
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBlogs = sortedBlogs.slice(startIndex, endIndex);

  const dispatch = useDispatch();

  // Fetch blogs only if not already fetched
  const { data, isLoading, error } = useGetBlogsQuery();
  useEffect(() => {
    if (data && data.posts && blogs.length === 0) {
      dispatch(setBlogs(data.posts));
    }
  }, [data, blogs]);

  const handleDelete = async (blogId) => {
    try {
      // Dispatch action to update Redux store
      dispatch(deleteBlog(blogId));

      showToast("Blog deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <AuthLayout>
      <Container>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">My Blog Posts</Typography>
            </Stack>
            <div>
              <Link href="/add-blog">
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <AddIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </Button>
              </Link>
            </div>
          </Stack>
          <Grid container spacing={3}>
            {paginatedBlogs.map((blog) => (
              <Grid xs={12} md={6} lg={4} key={blog.id}>
                <BlogCard blog={blog} handleDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={Math.ceil(userBlogs.length / itemsPerPage)}
              page={currentPage}
              size="small"
              onChange={handlePageChange}
            />
          </Box>
        </Stack>
      </Container>
    </AuthLayout>
  );
};

// Wrap MyPosts with withAuth HOC so the component is protected
export default withAuth(MyPosts);
