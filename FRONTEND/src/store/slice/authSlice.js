import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { login, logout, setUser } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated; 
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;