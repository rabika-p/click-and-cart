import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import reducers from API slices
import usersReducer from "../features/usersSlice";
import productsReducer from "../features/productsSlice";
import cartsReducer from "../features/cartsSlice";
import blogsReducer from "../features/blogsSlice";
import commentsReducer from "../features/commentsSlice";

// Import API services
import { usersApi } from "../services/usersApi";
import { productsApi } from "../services/productsApi";
import { blogsApi } from "../services/blogsApi";
import { commentsApi } from "@/services/commentsApi";

const rootReducer = combineReducers({
  // Define slices and corresponding reducers
  users: usersReducer,
  products: productsReducer,
  carts: cartsReducer,
  blogs: blogsReducer,
  comments: commentsReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [blogsApi.reducerPath]: blogsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
});

// Configure persistence options
const persistConfig = {
  key: "root", //  localStorage key
  version: 1,
  storage,
};

// Apply persistence to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  // Handle API requests made with redux toolkit query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(usersApi.middleware, productsApi.middleware, blogsApi.middleware, commentsApi.middleware),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
