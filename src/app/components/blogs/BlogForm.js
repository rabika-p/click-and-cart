"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { addBlog, selectBlogs, updateBlog } from "@/app/slices/blogsSlice";
import { showToast } from "../login/Toast";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CloseOutlined } from "@mui/icons-material";

const BlogForm = ({mode, blogToEdit}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const blogs = useSelector(selectBlogs);

  const [blogData, setBlogData] = useState({
    title: blogToEdit?.title || "",
    body: blogToEdit?.description || "",
    thumbnail: blogToEdit?.thumbnail || "",
  });

  useEffect(() => {
    if (mode === "edit" && blogToEdit) {
      setBlogData(blogToEdit);
    }
  }, [mode, blogToEdit]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        const newId =
          blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;
        const newBlog = { ...blogData, id: newId };
        dispatch(addBlog(newBlog));
        showToast("Blog added successfully", "success");
      } else if (mode === "edit" && blogToEdit) {
        dispatch(updateBlog(blogData));
        console.log(blogData)
        showToast("Blog updated successfully", "success");
      }
      router.push("/blogs");
    } catch (error) {
      console.error("Error:", error);
      showToast("Operation failed", "error");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <ShoppingCartOutlinedIcon className="text-3xl mr-2" />
          <h1 className="text-xl font-semibold">
            {mode === "add" ? "Add Blog" : "Edit Blog"}
          </h1>
        </div>
        <Link href="/blogs">
          <CloseOutlined className="text-2xl cursor-pointer" />
        </Link>
      </div>
      <p className="text-md text-gray-700 mb-4">        {mode === "add" ? "Enter Blog Information" : "Edit Blog Information"}
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
            placeholder="Enter blog title"
            value={blogData.title}
            onChange={handleInput}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={prodData.price}
            placeholder="Enter price"
            onChange={handleInput}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 mt-2 placeholder-gray-500"
          />
        </div> */}
{/* 
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
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="body"
            className="text-sm font-medium text-gray-700"
          >
            Body:
          </label>
          <input
            type="text"
            id="body"
            name="body"
            value={blogData.body}
            placeholder="Enter body"
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
            value={blogData.thumbnail}
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
            {mode === "add" ? "Add Blog" : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
