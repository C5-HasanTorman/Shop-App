import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/users";
import producSlice from "./reducers/products";

export default configureStore({
  reducer: {
    users: userSlice,
    products: producSlice,
  },
});
