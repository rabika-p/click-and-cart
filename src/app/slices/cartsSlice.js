import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex !== -1) {
        // If item already exists in cart, update its quantity
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        // If item is not in cart, add it
        state.cartItems.push({ product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== productId
      );
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.product.id === productId
      );
      if (cartItem) {
        const productStock = cartItem.product.stock;
        if (cartItem.quantity < productStock) {
          cartItem.quantity++;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.product.id === productId
      );
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartsSlice.actions;

export default cartsSlice.reducer;
