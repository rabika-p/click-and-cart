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

import { BlogCard } from "../../components/blogs/BlogCard";
// import { ProductsSearch } from "../components/products/ProductsSearch";

import { useGetBlogsQuery } from "../../services/blogsApi";
import withAuth from "../../hoc/withAuth";

import { selectBlogs, setBlogs } from "../../features/blogsSlice";
import AuthLayout from "../../layouts/authLayout";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogs = useSelector(selectBlogs);

  const itemsPerPage = 9;
  // Descending order of IDs
  const sortedBlogs = [...blogs].sort((a, b) => b.id - a.id);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBlogs = sortedBlogs.slice(startIndex, endIndex);

  const { data, isLoading, error } = useGetBlogsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.posts && blogs.length === 0) {
      dispatch(setBlogs(data.posts));
    }
  }, [data, blogs]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <AuthLayout>
      <Container>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Blogs </Typography>
            </Stack>
          </Stack>
          {/* <ProductsSearch /> */}
          <Grid container spacing={3}>
            {paginatedBlogs.map((blog) => (
              <Grid xs={12} md={6} lg={4} key={blog.id}>
                <BlogCard blog={blog} />
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
              count={Math.ceil(sortedBlogs.length / itemsPerPage)}
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

// Wrap Blogs with withAuth HOC so the component is protected
export default withAuth(Blogs);
