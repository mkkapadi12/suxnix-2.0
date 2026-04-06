import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProductsAPI,
  getFeaturedProductsAPI,
  getBestsellerProductsAPI,
  getProductsByCategoryAPI,
  getProductBySlugAPI,
  getProductByIdAPI,
  getRelatedProductsAPI,
} from './product.api';

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await getAllProductsAPI(params);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  },
);

export const getFeaturedProducts = createAsyncThunk(
  'product/getFeaturedProducts',
  async (limit = 8, { rejectWithValue }) => {
    try {
      const result = await getFeaturedProductsAPI(limit);
      return result;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch featured products',
      );
    }
  },
);

export const getBestsellerProducts = createAsyncThunk(
  'product/getBestsellerProducts',
  async (limit = 8, { rejectWithValue }) => {
    try {
      const result = await getBestsellerProductsAPI(limit);
      return result;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch bestseller products',
      );
    }
  },
);

export const getProductsByCategory = createAsyncThunk(
  'product/getProductsByCategory',
  async ({ category, params }, { rejectWithValue }) => {
    try {
      const result = await getProductsByCategoryAPI(category, params);
      return result;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch products by category',
      );
    }
  },
);

export const getProductBySlug = createAsyncThunk(
  'product/getProductBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const result = await getProductBySlugAPI(slug);
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || 'Product not found',
      );
    }
  },
);

export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      const result = await getProductByIdAPI(id);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Product not found');
    }
  },
);

export const getRelatedProducts = createAsyncThunk(
  'product/getRelatedProducts',
  async (productId, { rejectWithValue }) => {
    try {
      const result = await getRelatedProductsAPI(productId);
      return result;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch related products',
      );
    }
  },
);

const initialState = {
  products: [],
  currentProduct: null,
  relatedProducts: [],
  featuredProducts: [],
  bestsellerProducts: [],
  pagination: {},
  filters: {
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 5000,
    brand: [],
    isFeatured: false,
    isBestseller: false,
    sortBy: 'newest',
  },
  currentPage: 1,
  loading: false,
  detailLoading: false,
  relatedLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
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

      // Get Featured Products
      .addCase(getFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload.products;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Bestseller Products
      .addCase(getBestsellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBestsellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bestsellerProducts = action.payload.products;
      })
      .addCase(getBestsellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Products By Category
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Product By Slug
      .addCase(getProductBySlug.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(getProductBySlug.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentProduct = action.payload.product;
      })
      .addCase(getProductBySlug.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })

      // Get Product By Id
      .addCase(getProductById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentProduct = action.payload.product;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })

      // Get Related Products
      .addCase(getRelatedProducts.pending, (state) => {
        state.relatedLoading = true;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.relatedLoading = false;
        state.relatedProducts = action.payload.products;
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.relatedLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  resetFilters,
  setCurrentPage,
  clearCurrentProduct,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;
