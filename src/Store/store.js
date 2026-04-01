import { configureStore } from '@reduxjs/toolkit';
import userAuthSlice from './features/auth/user.auth.slice';
import adminAuthSlice from './features/admin/features/admin.auth.slice';
import profileSlice from './features/profile/profile.slice';
import addressSlice from './features/address/address.slice';
import orderSlice from './features/order/order.slice';
import wishlistSlice from './features/wishlist/wishlist.slice';
import adminProductSlice from './features/admin/features/admin.products.slice';

export const store = configureStore({
  reducer: {
    user: userAuthSlice,
    adminAuth: adminAuthSlice,
    profile: profileSlice,
    address: addressSlice,
    order: orderSlice,
    wishlist: wishlistSlice,
    adminProducts: adminProductSlice,
  },
});
