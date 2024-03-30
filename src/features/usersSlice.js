import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isAuthenticated: false,
    token: null,
    isAdmin: false,
    username: null,
    userId: null,
    otherDetails: null,
  },
  reducers: {
    loginSuccess(state, action) {
      const { id, token, isAdmin, username, ...otherDetails } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.isAdmin = isAdmin;
      state.username = username;
      state.userId = id;
      state.otherDetails = otherDetails;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      state.username = null;
      state.userId = null;
      state.otherDetails = null;
    },
  },
});

export const selectUserId = (state) => state.users.userId;
export const selectUsername = (state) => state.users.username;
export const selectToken = (state) => state.users.token;

export const selectNameById = (userId) => (state) => {
  return state.users.userId === userId
    ? state.users.otherDetails.firstName +
        " " +
        state.users.otherDetails.lastName
    : null;
};

export const { loginSuccess, logout } = usersSlice.actions;
export default usersSlice.reducer;
