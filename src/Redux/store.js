import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import mobileDataReducer from './Slices/mobileDataslice';
import categoryReducer from './Slices/categorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileData: mobileDataReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export default store;
