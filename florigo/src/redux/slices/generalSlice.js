import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// eslint-disable-next-line
export const getPosts = createAsyncThunk('getPosts/posts', async (data = null, rejectWithValue) => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const generalSlice = createSlice({
  name: 'generals',
  initialState: {
    message: '',
    snackbar: false,
    isLoading: false,
    posts: [],
    errorMessage: '',
    severity: '',
    sideBarIsOpen: true,
    sideBarIsHover: false,
  },
  reducers: {
    openSnackbar: (state, action) => {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.snackbar = true;
      state.isLoading = true;
    },
    closeSnackbar: (state) => {
      state.snackbar = false;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.isLoading = false;
      state.errorMessage = '';
    },
    setSidebar: (state, action) => {
      state.sideBarIsOpen = action.payload;
    },
    setHover: (state, action) => {
      state.sideBarIsHover = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload;
      state.isLoading = false;
      state.errorMessage = '';
    },
    [getPosts.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.isLoading = false;
    },
  },
});

export default generalSlice.reducer;
export const { openSnackbar, closeSnackbar, clearError, setSidebar, setHover, setLoading } = generalSlice.actions;
