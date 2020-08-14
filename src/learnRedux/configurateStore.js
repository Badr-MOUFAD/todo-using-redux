import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./CounterComponent/CounterSlice";

export const store = configureStore({
  reducer: {
    counter: CounterReducer
  }
});
