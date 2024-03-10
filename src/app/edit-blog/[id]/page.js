"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { selectBlogs } from "@/app/slices/blogsSlice";
import BlogForm from "@/app/components/blogs/BlogForm";
import FormLayout from "@/app/layouts/layout";
import withAuth from "@/app/hoc/withAuth";
import AuthLayout from "@/app/layouts/authLayout";

const EditBlogPage = () => {
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const blog = blogs.find(
            (blog) => blog.id === parseInt(id)
          );
          if (blog) {
            setBlogData(blog);
          } else {
            setError("Blog not found");
          }
        } catch (error) {
          setError("Error fetching blog");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [id, blogs]);

  if (!id) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <AuthLayout>
      <FormLayout minHeight={"90vh"}>
        {blogData && <BlogForm mode="edit" blogToEdit={blogData} />}
      </FormLayout>
    </AuthLayout>
  );
};

export default withAuth(EditBlogPage);
