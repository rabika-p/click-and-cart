"use client";
import ProductSingle from "@/components/products/ProductSingle";
import withAuth from "@/hoc/withAuth";
import AuthLayout from "@/layouts/authLayout";

const ProductSingleView = () => {
  return (
    <AuthLayout>
      <ProductSingle />
    </AuthLayout>
  );
};

export default withAuth(ProductSingleView);
