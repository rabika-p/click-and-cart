"use client";

import MyCart from "../../components/my-cart/MyCart";
import AuthLayout from "../../layouts/authLayout";

const CartPage = () => {
  return (
    <AuthLayout>
      <MyCart />
    </AuthLayout>
  );
};

export default CartPage;
