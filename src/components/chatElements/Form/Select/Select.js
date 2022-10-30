import React, { useState, useEffect } from "react";

import classes from "./Select.module.css";

const Select = (props) => {
  const [inputModified, setInputModified] = useState(false);

  useEffect(() => {
    if (!inputModified && props.value) {
      setInputModified(true);
      const targetOption = props.options.find((opt) => props.value === opt.id);
      props.setValue(props.id, props.value, targetOption.value);
    }
  }, [inputModified, props]);

  const messageClasses = [
    classes.Select,
    inputModified ? classes.Modified : "",
  ];

  const placeholder = (
    <option key={"placeholder"} disabled value={"placeholder"}>
      {props.placeholder}
    </option>
  );

  const options = props.options.map((opt) => {
    return (
      <option key={opt.id} value={opt.id}>
        {opt.value}
      </option>
    );
  });

  options.unshift(placeholder);

  const changeHandler = (e) => {
    if (!inputModified) setInputModified(true);
    const targetOption = props.options.find((opt) => e.target.value === opt.id);
    props.setValue(props.id, e.target.value, targetOption.value);
  };

  return (
    <div className={messageClasses.join(" ")}>
      <select
        id={props.id}
        onChange={changeHandler}
        disabled={props.isDisabled}
        style={props.style}
        defaultValue={props.value || "placeholder"}
        name={props.id}
      >
        {options}
      </select>
      <label htmlFor={props.id}> {props.label} </label>
    </div>
  );
};

export default Select;
