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

import { ProductCard } from "../components/products/ProductCard";
import { ProductsSearch } from "../components/products/ProductsSearch";
import SideNav from "../components/sidebar/SideNav";
import TopNav from "../components/topbar/TopNav";
import { showToast } from "../components/login/Toast";

import { useGetProductsQuery } from "../services/productsApi";
import withAuth from "../hoc/withAuth";

import {
  productDeleted,
  selectProducts,
  setProducts,
} from "../slices/productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector(selectProducts);
  const { data, isLoading, error } = useGetProductsQuery();

  const itemsPerPage = 9;
  // Descending order of IDs
  const sortedProducts = [...products].sort((a, b) => b.id - a.id);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  
  useEffect(() => {
    if (data && data.products && products.length === 0) {
      dispatch(setProducts(data.products));
    } else {
      dispatch(setProducts(products));
    }
  }, [data, products]);

  const handleDelete = async (productId) => {
    try {
      // Dispatch action to update Redux store
      dispatch(productDeleted(productId));
      showToast("Product deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting product:", "error");
    }
  };

  const handlePageChange = ( page) => {
    setCurrentPage(page);
  };

  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-1">
        <SideNav />
      </div>
      <div className="col-span-4">
        <TopNav />
        <Container maxWidth="xl" className="mb-4">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Product List</Typography>
              </Stack>
              <div>
                {isAdmin && (
                  <Link href="/add-product">
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
                )}
              </div>
            </Stack>
            <ProductsSearch />
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid xs={12} md={6} lg={4} key={product.id}>
                  <ProductCard product={product} handleDelete={handleDelete} />
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
                count={Math.ceil(sortedProducts.length / itemsPerPage)}
                page={currentPage}
                size="small"
                onChange={handlePageChange}
              />
            </Box>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

// Wrap Products with withAuth HOC so the component is protected
export default Products;
