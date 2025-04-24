// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Import the auth reducer
import adminReducer from "./slices/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, 
    admin: adminReducer,
  },
});

export default store;
