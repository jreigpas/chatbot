import React, { useState, useEffect } from "react";

import classes from "./TextInput.module.css";

const TextInput = (props) => {
  const [inputModified, setInputModified] = useState(false);

  const messageClasses = [
    classes.TextInput,
    inputModified ? classes.Modified : "",
  ];

  useEffect(() => {
    // comoponentDidMout hook to set select value in a default valued is passed in props
    if (!inputModified && props.value) {
      setInputModified(true);
      props.setValue(props.id, props.value, props.value);
    }
  }, [inputModified, props]);

  const changeHandler = (e) => {
    if (!inputModified) setInputModified(true);
    props.setValue(props.id, e.target.value, e.target.value);
  };

  let errMsg = "";
  if (props.showErrors && !props.isValid) {
    messageClasses.push(classes.Invalid);
    errMsg = (
      <div className={classes.Error}>
        <span>
          {"\u26A0"} {props.errorMessage}
        </span>
      </div>
    );
  }

  return (
    <div className={messageClasses.join(" ")}>
      <input
        id={props.id}
        onChange={changeHandler}
        style={props.style}
        placeholder={props.placeholder}
        disabled={props.isDisabled}
        value={props.value}
        name={props.id}
      />
      <label htmlFor={props.id}> {props.label} </label>
      {errMsg}
    </div>
  );
};

export default TextInput;
