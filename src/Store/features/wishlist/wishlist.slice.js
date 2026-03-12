import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWishlistAPI,
  addToWishlistAPI,
  removeFromWishlistAPI,
  clearWishlistAPI,
  checkInWishlistAPI,
} from './wishlistAPI';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlistAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await addToWishlistAPI(productData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await removeFromWishlistAPI(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to remove from wishlist');
    }
  }
);

export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearWishlistAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to clear wishlist');
    }
  }
);

export const checkInWishlist = createAsyncThunk(
  'wishlist/checkInWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await checkInWishlistAPI(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to check wishlist');
    }
  }
);

const initialState = {
  wishlist: null,
  items: [],
  loading: false,
  error: null,
  totalItems: 0,
  checkedProducts: {},
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Wishlist
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist;
        state.items = action.payload.wishlist.items;
        state.totalItems = action.payload.wishlist.totalItems;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add to Wishlist
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist;
        state.items = action.payload.wishlist.items;
        state.totalItems = action.payload.wishlist.totalItems;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Remove from Wishlist
    builder
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist;
        state.items = action.payload.wishlist.items;
        state.totalItems = action.payload.wishlist.totalItems;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Clear Wishlist
    builder
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist;
        state.items = [];
        state.totalItems = 0;
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Check in Wishlist
    builder
      .addCase(checkInWishlist.fulfilled, (state, action) => {
        state.checkedProducts[action.meta.arg] = action.payload.isInWishlist;
      });
  },
});

export const { clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
