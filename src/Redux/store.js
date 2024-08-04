import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks
    }),
});

export default store;
