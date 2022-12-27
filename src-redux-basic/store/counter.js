import { createSlice } from "@reduxjs/toolkit";

const intialCounterState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: intialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducers;
