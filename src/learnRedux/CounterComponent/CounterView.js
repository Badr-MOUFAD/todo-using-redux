import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  counterSelector,
  increment,
  decrement,
  incrementBy
} from "./CounterSlice";

export default function CounterView(props) {
  const [valueToAdd, setValueToAdd] = useState(0);
  const counter = useSelector(counterSelector);
  const dispatch = useDispatch();

  return (
    <div className="mx-2 my-2">
      <h3>Counter with redux</h3>
      <div className="increment-decrement">
        <button
          style={{ width: "30px" }}
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
        <strong className="px-3">{counter.value}</strong>
        <button
          style={{ width: "30px" }}
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </button>
      </div>
      <div className="mt-2">
        <input
          className="w-25"
          type="number"
          value={valueToAdd}
          onChange={({ target }) => setValueToAdd(target.value)}
        />
        <button onClick={() => dispatch(incrementBy(valueToAdd))}>Add</button>
      </div>
    </div>
  );
}
