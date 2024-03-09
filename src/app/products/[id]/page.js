"use client";
import ProductSingle from "@/app/components/products/ProductSingle";
import withAuth from "@/app/hoc/withAuth";
import AuthLayout from "@/app/layouts/authLayout";

const ProductSingleView = () => {
  return (
    <AuthLayout>
      <ProductSingle />
    </AuthLayout>
  );
};

export default withAuth(ProductSingleView);
