import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfileAPI } from './profileAPI';

const initialState = {
  loading: false,
  error: null,
  success: false,
};

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data, { rejectWithValue }) => {
    try {
      const result = await updateProfileAPI(data);
      return result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Profile update failed',
      );
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    clearProfileSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearProfileError, clearProfileSuccess } = profileSlice.actions;
export default profileSlice.reducer;
