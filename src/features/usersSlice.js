import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isAuthenticated: false,
    token: null,
    isAdmin: false,
    username: null,
    userId: null,
  },
  reducers: {
    loginSuccess(state, action) {
      const { id, token, isAdmin, username } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.isAdmin = isAdmin;
      state.username = username;
      state.userId = id;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      state.username = null;
      state.userId = null;
    },
  },
});

export const selectUserId = state => state.users.userId;
export const selectUsername = state => state.users.username;
export const selectToken = state => state.users.token;

export const { loginSuccess, logout } = usersSlice.actions;
export default usersSlice.reducer;
