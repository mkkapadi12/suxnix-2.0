import { configureStore } from '@reduxjs/toolkit';
import userAuthSlice from './features/auth/auth.slice';

export const store = configureStore({
  reducer: {
    user: userAuthSlice,
  },
});
