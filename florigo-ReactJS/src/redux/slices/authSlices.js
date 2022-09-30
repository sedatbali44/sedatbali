import axios, { session, clearSession } from 'utils/axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const login = createAsyncThunk('auth/login', async (obj, { rejectWithValue }) => {
  const response = await axios.post('auth/login', obj).catch((err) => err);

  if (!response.data) {
    return rejectWithValue(response.message);
  }
  return response.data;
});

const initialState = {
  user: null,
  isLoading: false,
  accessToken: null,
  errorMessage: '',
  isAuthenticated: false,
  isInitialized: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserPermissions(state, action) {
      state.user.permissions = action.payload;
    },

    updateUserProfileImage(state, action) {
      state.user = { ...state.user, details: { ...state.user.details, photoUrl: action.payload } };
    },

    setLoading(state) {
      state.isLoading = false;
      state.errorMessage = '';
    },
    logout(state) {
      clearSession();
      state.errorMessage = '';
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.isLoading = false;
    },
    updateProfileValues(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      const { accessToken, user } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.isLoading = true;
      session(accessToken);
    },
    [login.rejected]: (state, action) => {
      clearSession();
      state.errorMessage = action.payload;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;

export const { setLoading, logout, updateUserProfileImage, updateUserPermissions, updateProfileValues } =
  authSlice.actions;
