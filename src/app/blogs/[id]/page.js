"use client";

import BlogSingle from "@/components/blogs/BlogSingle";
import withAuth from "@/hoc/withAuth";
import AuthLayout from "@/layouts/authLayout";

const BlogSingleView = () => {
  return (
    <AuthLayout>
      <BlogSingle />
    </AuthLayout>
  );
};

export default withAuth(BlogSingleView);
