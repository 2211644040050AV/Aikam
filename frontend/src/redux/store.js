// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Import the auth reducer
import adminReducer from "./slices/adminSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, 
    admin: adminReducer,
    cart: cartReducer,
  },
});

export default store;
