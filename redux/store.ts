import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Ensure path is correct

// Configure the store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
