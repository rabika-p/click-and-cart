"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

import {
  CardMedia,
  CardContent,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { selectProductById } from "@/app/slices/productsSlice";

const ProductSingle = () => {
  const { isAdmin } = useSelector((state) => state.users);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = useSelector(selectProductById(id));

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity < 1) return;
    if (newQuantity > product.stock) return;
    setQuantity(newQuantity);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Paper
      elevation={9}
      style={{
        display: "flex",
        maxWidth: 800,
        margin: "auto",
        alignItems: "center",
        marginTop: "3%",
      }}
    >
      <CardMedia
        component="img"
        src={product.thumbnail}
        alt={product.name}
        sx={{
          minWidth: { xs: "100%", sm: "300px" },
          minHeight: { xs: "300px", sm: "auto" },
          flex: { xs: "none", sm: "1" },
          objectFit: "cover",
          borderRadius: "20px",
          padding: "16px",
        }}
      />
      <CardContent
        sx={{
          flex: "1",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="h5" component="h2" gutterBottom>
            {product.title}
          </Typography>
          <Divider sx={{ margin: "8px 0" }} />
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Rating: {product.rating}
          </Typography>
        </div>
        <Divider sx={{ marginTop: "18px" }} />
        <Typography variant="h6" color="primary" style={{ marginTop: 8 }}>
          Price: {product.price}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          In stock: {product.stock}
        </Typography>
        {!isAdmin && (
          <>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 16 }}
            >
              <Button
                variant="outlined"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </Button>
              <Typography variant="body2" style={{ margin: "0 6%" }}>
                {quantity}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </Button>
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#647cf4",
                "&:hover": {
                  backgroundColor: "#4e50cd",
                },
                marginTop: "7%",
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              startIcon={<ShoppingCartIcon />}
            >
              Add To Cart
            </Button>
          </>
        )}
      </CardContent>
    </Paper>
  );
};

export default ProductSingle;
