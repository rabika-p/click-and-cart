"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  addProduct,
  selectCategories,
  selectProducts,
  updateProduct,
} from "@/app/slices/productsSlice";
import { showToast } from "../login/Toast";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CloseOutlined } from "@mui/icons-material";

const ProductForm = ({ mode, productToEdit }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const [productData, setProductData] = useState({
    title: productToEdit?.title || "",
    price: productToEdit?.price || "",
    description: productToEdit?.description || "",
    rating: productToEdit?.rating || "",
    thumbnail: productToEdit?.thumbnail || "",
    stock: productToEdit?.stock || "",
    category: productToEdit?.category || "",
  });

  useEffect(() => {
    if (mode === "edit" && productToEdit) {
      setProductData(productToEdit);
    }
  }, [mode, productToEdit]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        const newId =
          products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = { ...productData, id: newId };
        dispatch(addProduct(newProduct));
        showToast("Product added successfully", "success");
      } else if (mode === "edit" && productToEdit) {
        dispatch(updateProduct(productData));
        console.log(productData);
        showToast("Product updated successfully", "success");
      }
      router.push("/products");
    } catch (error) {
      console.error("Error:", error);
      showToast("Operation failed", "error");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <ShoppingCartOutlinedIcon className="text-3xl mr-2" />
          <h1 className="text-xl font-semibold">
            {mode === "add" ? "Add Product" : "Edit Product"}
          </h1>
        </div>
        <Link href="/products">
          <CloseOutlined className="text-2xl cursor-pointer" />
        </Link>
      </div>
      <p className="text-md text-gray-700 mb-4">
        {" "}
        {mode === "add"
          ? "Enter Product Information"
          : "Edit Product Information"}
      </p>
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
        <div className="mb-4 flex">
          <div className="mr-4">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
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
          <div className="ml-4">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInput}
              required
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
            >
              <option value="">Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 flex">
          <div className="mr-4">
            <label
              htmlFor="rating"
              className="text-sm font-medium text-gray-700"
            >
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

          <div className="ml-3">
            <label
              htmlFor="stock"
              className="text-sm font-medium text-gray-700"
            >
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              placeholder="Enter quantity in stock"
              onChange={handleInput}
              required
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={productData.description}
            placeholder="Enter description"
            onChange={handleInput}
            required
            rows="4"
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
            {mode === "add" ? "Add Product" : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
