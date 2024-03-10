"use client";

import ProductForm from "../components/products/ProductForm";
import withAuth from "../hoc/withAuth";
import AuthLayout from "../layouts/authLayout";
import FormLayout from "../layouts/layout";

const ProductFormPage = () => {
  return (
    <AuthLayout>
      <FormLayout minHeight={"100vh"}>
        <ProductForm mode="add" />
      </FormLayout>
    </AuthLayout>
  );
};

export default withAuth(ProductFormPage);
