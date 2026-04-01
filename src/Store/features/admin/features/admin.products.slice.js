import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProductsAPI,
  getProductStatsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
  updateProductStatusAPI,
  togglePublishAPI,
  toggleFeaturedAPI,
  toggleBestsellerAPI,
  updateStockAPI,
  bulkUpdateStatusAPI,
} from '../api/admin.products.api';

const initialState = {
  products: [],
  stats: {},
  pagination: {},
  loading: false,
  formLoading: false,
  deleteLoading: false,
  selectedProduct: null,
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
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await getAllProductsAPI(params);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createProduct = createAsyncThunk(
  'admin/products/create',
  async (data, { rejectWithValue }) => {
    try {
      const result = await createProductAPI(data);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  'admin/products/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const result = await updateProductAPI(id, data);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'admin/products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateProductStatus = createAsyncThunk(
  'admin/products/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const result = await updateProductStatusAPI(id, status);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const togglePublish = createAsyncThunk(
  'admin/products/togglePublish',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await togglePublishAPI(id);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const toggleFeatured = createAsyncThunk(
  'admin/products/toggleFeatured',
  async (id, { rejectWithValue }) => {
    try {
      const result = await toggleFeaturedAPI(id);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const toggleBestseller = createAsyncThunk(
  'admin/products/toggleBestseller',
  async (id, { rejectWithValue }) => {
    try {
      const result = await toggleBestsellerAPI(id);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateStock = createAsyncThunk(
  'admin/products/updateStock',
  async ({ id, stock }, { rejectWithValue }) => {
    try {
      const result = await updateStockAPI(id, stock);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const bulkUpdateStatus = createAsyncThunk(
  'admin/products/bulkUpdateStatus',
  async ({ productIds, status }, { rejectWithValue }) => {
    try {
      const result = await bulkUpdateStatusAPI(productIds, status);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const adminProductSlice = createSlice({
  name: 'admin/products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Stats
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

      // Get All Products
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
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.formLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.formLoading = false;
        state.products.unshift(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.formLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.formLoading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateProductStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle Publish
      .addCase(togglePublish.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })

      // Toggle Featured
      .addCase(toggleFeatured.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })

      // Toggle Bestseller
      .addCase(toggleBestseller.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })

      // Update Stock
      .addCase(updateStock.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })

      // Bulk Update Status
      .addCase(bulkUpdateStatus.fulfilled, (state, action) => {
        state.products = state.products.map((product) => {
          const updated = action.payload.products.find(
            (p) => p._id === product._id,
          );
          return updated || product;
        });
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  adminProductSlice.actions;

export default adminProductSlice.reducer;
