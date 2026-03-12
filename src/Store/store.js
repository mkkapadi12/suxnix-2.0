import { configureStore } from '@reduxjs/toolkit';
import userAuthSlice from './features/auth/auth.slice';
import profileSlice from './features/profile/profile.slice';
import addressSlice from './features/address/address.slice';
import orderSlice from './features/order/order.slice';
import wishlistSlice from './features/wishlist/wishlist.slice';

export const store = configureStore({
  reducer: {
    user: userAuthSlice,
    profile: profileSlice,
    address: addressSlice,
    order: orderSlice,
    wishlist: wishlistSlice,
  },
});
