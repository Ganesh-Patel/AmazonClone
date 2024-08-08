import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import mobileDataReducer from './Slices/mobileDataslice';
import categoryReducer from './Slices/categorySlice';
import productReducer from './Slices/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileData: mobileDataReducer,
    category: categoryReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export default store;
