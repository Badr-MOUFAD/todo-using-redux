import React, { useRef, useState } from "react";

import { Input } from "reactstrap";

export default function TestRef(props) {
  const inputText = useRef(null);
  const [count, setCount] = useState(0);

  const inputText2 = useRef(null);

  return (
    <div>
      <input className="ml-5 my-5 w-25" ref={inputText} />
      <button
        onClick={() => {
          console.log(inputText2.current.value);
          setCount(count + 1);
        }}
      >
        Update
      </button>
      <hr />

      <Input
        className="w-25 ml-5"
        innerRef={el => {
          inputText2.current = el;
        }}
      />
    </div>
  );
}
