"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {selectProducts } from "@/app/slices/productsSlice";
import ProductForm from "@/app/components/products/ProductForm";
import SideNav from "@/app/components/sidebar/SideNav";
import TopNav from "@/app/components/topbar/TopNav";
import FormLayout from "@/app/layouts/layout";
import withAuth from "@/app/hoc/withAuth";

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
    <div className="grid grid-cols-6 h-screen">
      <div className="col-span-1">
        <SideNav />
      </div>
      <div className="col-span-5">
        <TopNav />
        <FormLayout minHeight={"90vh"}>
          {productData && (
            <ProductForm mode="edit" productToEdit={productData} />
          )}
        </FormLayout>
      </div>
    </div>
  );
};

export default EditProductPage;
