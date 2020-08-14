import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state, action) => {
      ++state.value;
    },
    decrement: (state, action) => {
      --state.value;
    },
    incrementBy: (state, action) => {
      state.value += Number(action.payload);
    }
  }
});

export const { increment, decrement, incrementBy } = CounterSlice.actions;

export const counterSelector = state => state.counter;

export default CounterSlice.reducer;
