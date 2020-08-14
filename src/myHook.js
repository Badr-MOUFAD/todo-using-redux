import React, { useState, useRef } from "react";

export default function Example(props) {
  const [info, setInfoByKey] = useMultiState({
    firstName: "",
    lastName: "",
    telNum: "",
    email: ""
  });

  return (
    <form className="container shadow-sm pb-3">
      <legend>Form :</legend>
      {Object.keys(info).map((key, index) => (
        <div key={index} className="py-1">
          <input
            type="text"
            name={key}
            placeholder={`Enter your ${key}`}
            value={info[key]}
            onChange={({ target }) => {
              setInfoByKey(target.name, target.value);
            }}
          />
        </div>
      ))}
    </form>
  );
}

export function useMultiState(initObj) {
  const refObj = useRef(initObj);
  const [_, setObj] = useState(initObj);

  const setObjByKey = (key, val) => {
    refObj.current[key] = val;

    let newObj = Object.create(refObj.current);

    setObj(newObj);
  };

  return [refObj.current, setObjByKey];
}
