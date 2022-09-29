import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'sockets',
  initialState: {
    socketId: null,
  },
  reducers: {
    createSocket(state, action) {
      state.socketId = action.payload;
    },
    clearSocket(state) {
      state.socketId = null;
    },
  },
});

export default socketSlice.reducer;
export const { createSocket, clearSocket } = socketSlice.actions;
