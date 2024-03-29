"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { selectProducts } from "@/features/productsSlice";
import ProductForm from "@/components/products/ProductForm";
import FormLayout from "@/layouts/layout";
import withAuth from "@/hoc/withAuth";
import AuthLayout from "@/layouts/authLayout";

const EditProductPage = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const product = products.find(
            (product) => product.id === parseInt(id)
          );
          if (product) {
            setProductData(product);
          } else {
            setError("Product not found");
          }
        } catch (error) {
          setError("Error fetching product");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [id, products]);

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
      <FormLayout minHeight={"100vh"}>
        {productData && <ProductForm mode="edit" productToEdit={productData} />}
      </FormLayout>
    </AuthLayout>
  );
};

export default withAuth(EditProductPage);
