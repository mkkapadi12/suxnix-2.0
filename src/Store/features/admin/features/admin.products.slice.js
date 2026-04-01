import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProductsAPI,
  getProductStatsAPI,
} from '../api/admin.products.api';

const initialState = {
  products: [],
  stats: {},
  pagination: {},
  loading: false,
  error: null,
};

export const getProductStats = createAsyncThunk(
  'admin/products/stats',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getProductStatsAPI();
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getAllProducts = createAsyncThunk(
  'admin/products',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllProductsAPI();
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

const adminProductSlice = createSlice({
  name: 'admin/products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
      })
      .addCase(getProductStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
