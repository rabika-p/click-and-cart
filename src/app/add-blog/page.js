"use client";

import BlogForm from "../../components/blogs/BlogForm";
import withAuth from "../../hoc/withAuth";
import AuthLayout from "../../layouts/authLayout";
import FormLayout from "../../layouts/layout";

const BlogFormPage = () => {
  return (
    <AuthLayout>
      <FormLayout minHeight={"90vh"}>
        <BlogForm mode="add" />
      </FormLayout>
    </AuthLayout>
  );
};

export default withAuth(BlogFormPage);
