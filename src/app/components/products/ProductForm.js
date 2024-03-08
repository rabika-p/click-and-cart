"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { addProduct, selectProducts } from "@/app/slices/productsSlice";
import { showToast } from "../login/Toast";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CloseOutlined } from "@mui/icons-material";

const ProductForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  const [productData, setProductData] = useState({
    id: Math.floor(Math.random() * 1000),
    title: "",
    price: "",
    description: "",
    rating: "",
    thumbnail: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;
    try {
      const newProduct = { ...productData, id: newId };
      dispatch(addProduct(newProduct));
      showToast("Product added succesfully", "success");
      router.push("/products");
      setProductData({
        id: newId,
        title: "",
        price: "",
        thumbnail: "",
        rating: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      showToast("Product could not be added", "error");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <ShoppingCartOutlinedIcon className="text-3xl mr-2" />
          <h1 className="text-xl font-semibold">Add Product</h1>
        </div>
        <Link href="/products">
          <CloseOutlined className="text-2xl cursor-pointer" />
        </Link>
      </div>
      <p className="text-md text-gray-700 mb-4">Enter Product Information</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter product title"
            value={productData.title}
            onChange={handleInput}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            placeholder="Enter price"
            onChange={handleInput}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rating" className="text-sm font-medium text-gray-700">
            Rating:
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={productData.rating}
            placeholder="Enter rating"
            onChange={handleInput}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={productData.description}
            placeholder="Enter description"
            onChange={handleInput}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="text-sm font-medium text-gray-700"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={productData.thumbnail}
            placeholder="Enter image URL"
            onChange={handleInput}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
          />
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
