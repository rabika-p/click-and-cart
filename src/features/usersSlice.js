import { createSlice } from '@reduxjs/toolkit';
//persistent store

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isAuthenticated: false,
    token: null,
    isAdmin: false,
    username: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      state.username = action.payload.username;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      state.username = null;
    },
  },
});

export const { loginSuccess, logout } = usersSlice.actions;
export default usersSlice.reducer;
