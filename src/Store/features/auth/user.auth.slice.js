import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI, getProfileAPI, registerUserAPI } from './userAuthAPI';

const initialState = {
  user: null,
  token: localStorage.getItem('suxnixToken') || null,
  loading: false,
  error: null,
};

// REGISTER
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const result = await registerUserAPI(data);
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

// LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await loginUserAPI(data);

      localStorage.setItem('suxnixToken', result.token);

      await dispatch(getProfile());

      return result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'login Failed!',
      );
    }
  },
);

// GET PROFILE
export const getProfile = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      return await getProfileAPI();
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch profile',
      );
    }
  },
);

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('suxnixToken');
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PROFILE
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getProfile.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.error = action.payload;
        localStorage.removeItem('suxnixToken');
      });
  },
});

export const { logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
