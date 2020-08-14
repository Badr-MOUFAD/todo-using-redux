import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoAppSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});
