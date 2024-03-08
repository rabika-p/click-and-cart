import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    productDeleted: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct, setProducts, productDeleted } = productsSlice.actions;

export default productsSlice.reducer;

export const selectProducts = state => state.products.products;

