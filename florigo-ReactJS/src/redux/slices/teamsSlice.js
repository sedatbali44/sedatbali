import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTeams = createAsyncThunk('teams/getTeams', async () =>
  axios.post('https://jsonplaceholder.typicode.com/posts').catch((err) => err.errorMessage)
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  departments: [],
};

const teamsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setIsloading: (state, { payload }) => {
      state.isLoading = payload; // örnek state update and payload state manipulation
    },
  },
  extraReducers: {
    [getTeams.pending]: (state) => {
      state.isLoading = true;
    },
    [getTeams.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getTeams.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default teamsSlice.reducer;

export const { setIsloading } = teamsSlice.actions; // dispatch(setIsLoading())
