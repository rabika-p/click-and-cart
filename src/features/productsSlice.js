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
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const updatedProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (updatedProductIndex !== -1) {
        state.products[updatedProductIndex] = action.payload;
      }
    },
  },
});

export const { addProduct, setProducts, productDeleted, updateProduct } =
  productsSlice.actions;

export default productsSlice.reducer;

export const selectProducts = (state, searchQuery, category) => {
  let filteredProducts = state.products.products;

  // Apply search query filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply category filter
  if (category && category !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  return filteredProducts;
};

export const selectCategories = (state) => {
  // Extract all categories from products
  const allCategories = state.products.products.map(
    (product) => product.category
  );
  // Remove duplicates using Set
  const uniqueCategories = [...new Set(allCategories)];
  return uniqueCategories;
};

export const selectProductById = (id) => (state) =>
  state.products.products.find((product) => product.id === parseInt(id));
