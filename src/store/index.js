import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import productsReducer from '../features/productsSlice';
import cartsReducer from '../features/cartsSlice';
import blogsReducer from '../features/blogsSlice';

import { usersApi } from '../services/usersApi';
import { productsApi } from '../services/productsApi';
import { blogsApi } from '../services/blogsApi';

const store = configureStore({
  reducer: {
    // Define slices and corresponding reducers
    users: usersReducer,
    products: productsReducer,
    carts: cartsReducer,
    blogs: blogsReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  // Handle API requests made with redux toolkit query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, productsApi.middleware, blogsApi.middleware),
});

export default store;
