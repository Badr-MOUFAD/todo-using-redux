import React, { useState } from "react";
import { createStore } from "redux";

const reducer = (state = { count: 0 }, action) => {
  if (action.type === "increment") {
    return { count: state.count + action.payload };
  }

  return state;
};

const store = createStore(reducer);

const increment = (amount = 1) => {
  return {
    type: "increment",
    payload: amount
  };
};

export function Counter(props) {
  const [counter, setCounter] = useState(0);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button onClick={() => setCounter(counter + 1)}>
        I was clicked <strong>{`${counter}`}</strong> time
      </button>
    </div>
  );
}
