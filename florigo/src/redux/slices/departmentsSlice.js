import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDepartments = createAsyncThunk('departments/getPosts', async () =>
  axios.post('https://jsonplaceholder.typicode.com/posts').catch((err) => err.errorMessage)
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  departments: [],
};

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setIsloading: (state, { payload }) => {
      state.isLoading = payload; // örnek state update and payload state manipulation
    },
  },
  extraReducers: {
    [getDepartments.pending]: (state) => {
      state.isLoading = true;
    },
    [getDepartments.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getDepartments.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default departmentSlice.reducer;

export const { setIsloading } = departmentSlice.actions; // dispatch(setIsLoading())
