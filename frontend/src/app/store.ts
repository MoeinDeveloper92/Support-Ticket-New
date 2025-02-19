import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});

//Get the type of the store
export type AppStore = typeof store;

//Infer the RootState and AppDispatch types from the store itseldf
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
