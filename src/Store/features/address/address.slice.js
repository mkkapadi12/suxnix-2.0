import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAddressesAPI,
  createAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
  setDefaultAddressAPI,
} from './addressAPI';

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  success: false,
};

// GET ALL ADDRESSES
export const getAddresses = createAsyncThunk(
  'address/getAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAddressesAPI();
      return result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch addresses',
      );
    }
  },
);

// CREATE ADDRESS
export const createAddress = createAsyncThunk(
  'address/createAddress',
  async (data, { rejectWithValue }) => {
    try {
      const result = await createAddressAPI(data);
      return result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to create address',
      );
    }
  },
);

// UPDATE ADDRESS
export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const result = await updateAddressAPI(id, data);
      return result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to update address',
      );
    }
  },
);

// DELETE ADDRESS
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (id, { rejectWithValue }) => {
    try {
      await deleteAddressAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to delete address',
      );
    }
  },
);

// SET DEFAULT ADDRESS
export const setDefaultAddress = createAsyncThunk(
  'address/setDefaultAddress',
  async (id, { rejectWithValue }) => {
    try {
      const result = await setDefaultAddressAPI(id);
      return result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to set default address',
      );
    }
  },
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
    clearAddressSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ADDRESSES
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.addresses;
        state.error = null;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE ADDRESS
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload.address);
        state.error = null;
        state.success = true;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // UPDATE ADDRESS
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload.address._id,
        );
        if (index !== -1) {
          state.addresses[index] = action.payload.address;
        }
        state.error = null;
        state.success = true;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // DELETE ADDRESS
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload,
        );
        state.error = null;
        state.success = true;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // SET DEFAULT ADDRESS
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr._id === action.payload.address._id,
        }));
        state.error = null;
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddressError, clearAddressSuccess } = addressSlice.actions;
export default addressSlice.reducer;
