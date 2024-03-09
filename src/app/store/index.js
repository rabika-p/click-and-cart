import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlice';
import productsReducer from '../slices/productsSlice';
import cartsReducer from '../slices/cartsSlice';

import { usersApi } from '../services/usersApi';
import { productsApi } from '../services/productsApi';

const store = configureStore({
  reducer: {
    // Define slices and corresponding reducers
    users: usersReducer,
    products: productsReducer,
    carts: cartsReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // Handle API requests made with redux toolkit query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, productsApi.middleware),
});

export default store;
