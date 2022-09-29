import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEmployees = createAsyncThunk('employees/getEmployees', async () =>
  axios.post('https://jsonplaceholder.typicode.com/posts').catch((err) => err.errorMessage)
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  departments: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setIsloading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
  extraReducers: {
    [getEmployees.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmployees.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getEmployees.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default employeesSlice.reducer;

export const { setIsloading } = employeesSlice.actions;
