import React, { useState, useEffect } from "react";

import classes from "./Checkbox.module.css";

const Checkbox = (props) => {
  const [inputModified, setInputModified] = useState(false);

  const messageClasses = [
    classes.Checkbox,
    inputModified ? classes.Modified : "",
  ];

  // const isChecked = props.value === 'true' ;
  useEffect(() => {
    // comoponentDidMout hook to set select value in a default valued is passed in props
    if (!inputModified && props.value) {
      setInputModified(true);
      props.setValue(props.id, props.value, null);
    }
  }, [inputModified, props]);

  const changeHandler = (e) => {
    if (!inputModified) setInputModified(true);
    console.log(e.target.checked);
    props.setValue(props.id, e.target.checked, null);
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
        type="checkbox"
        onChange={changeHandler}
        style={props.style}
        disabled={props.isDisabled}
        checked={props.value}
        name={props.id}
      />
      <label htmlFor={props.id}> {props.label} </label>
      {errMsg}
    </div>
  );
};

export default Checkbox;
