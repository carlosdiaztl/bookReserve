import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "../reducers/booksReducer";
import { userReducer } from "../reducers/userReducer";
const reducer = {
  userStore: userReducer,
  booksStore: booksReducer
};
const store = configureStore({
  reducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
