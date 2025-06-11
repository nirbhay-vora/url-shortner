import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js"; // Import your auth slice
// Example: import your reducers here
// import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth : authReducer
    // Add more reducers here
  },
});