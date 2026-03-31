import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginAdminAPI,
  getAdminProfileAPI,
  registerAdminAPI,
  updateAdminProfileAPI,
  changeAdminPasswordAPI,
} from './adminAuthAPI';

const initialState = {
  admin: null,
  token: localStorage.getItem('suxnixAdminToken') || null,
  role: localStorage.getItem('suxnixAdminRole') || null,
  permissions: JSON.parse(localStorage.getItem('suxnixAdminPermissions')) || [],
  loading: false,
  error: null,
};

// REGISTER ADMIN
export const registerAdmin = createAsyncThunk(
  'adminAuth/register',
  async (data, { rejectWithValue }) => {
    try {
      const result = await registerAdminAPI(data);
      return result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Registration failed',
      );
    }
  },
);

// LOGIN ADMIN
export const loginAdmin = createAsyncThunk(
  'adminAuth/login',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await loginAdminAPI(data);
      console.log(result);
      localStorage.setItem('suxnixAdminToken', result.token);
      localStorage.setItem('suxnixAdminRole', result.role);
      localStorage.setItem(
        'suxnixAdminPermissions',
        JSON.stringify(result.permissions || []),
      );

      await dispatch(getAdminProfile());

      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || 'Login Failed!');
    }
  },
);

// GET ADMIN PROFILE
export const getAdminProfile = createAsyncThunk(
  'adminAuth/profile',
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminProfileAPI();
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch profile',
      );
    }
  },
);

// UPDATE ADMIN PROFILE
export const updateAdminProfile = createAsyncThunk(
  'adminAuth/updateProfile',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await updateAdminProfileAPI(data);
      await dispatch(getAdminProfile());
      return result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to update profile',
      );
    }
  },
);

// CHANGE PASSWORD
export const changeAdminPassword = createAsyncThunk(
  'adminAuth/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      return await changeAdminPasswordAPI(data);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to change password',
      );
    }
  },
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      state.role = null;
      state.permissions = [];
      localStorage.removeItem('suxnixAdminToken');
      localStorage.removeItem('suxnixAdminRole');
      localStorage.removeItem('suxnixAdminPermissions');
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.permissions = action.payload.permissions || [];
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PROFILE
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.role = action.payload.admin.role;
        state.permissions = action.payload.admin.permissions || [];
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.admin = null;
        state.token = null;
        state.role = null;
        state.permissions = [];
        state.error = action.payload;
        localStorage.removeItem('suxnixAdminToken');
        localStorage.removeItem('suxnixAdminRole');
        localStorage.removeItem('suxnixAdminPermissions');
      })

      // UPDATE PROFILE
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdminProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHANGE PASSWORD
      .addCase(changeAdminPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changeAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
