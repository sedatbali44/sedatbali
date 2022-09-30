import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEmployees = createAsyncThunk('employees/getPosts', async () =>
  axios.post('https://jsonplaceholder.typicode.com/posts')
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  employees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setIsloading: (state, { payload }) => {
      state.isLoading = payload; // örnek state update and payload state manipulation
    },
    setEmployees: (state, action) => {
      state.employees = action.payload.map((item) => {
        item.label = `${item.firstname} ${item.lastname}`;
        return item;
      });
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

export const { setIsloading, setEmployees } = employeesSlice.actions; // dispatch(setIsLoading())
