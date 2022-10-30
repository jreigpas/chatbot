import React, { useState } from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    // if (!props.disabled) {
    //   setClicked(true);
    // }
    if (props.type === 'URL' && props.action === 'GET_LOCATION')
    {
      props.getClick(props.action, props.title);
    } 
    else if (props.type === 'URL') {
      window.open(
        props.value,
        props.type === "URL" ? "_blank" : "_self"
      );
    }
    else if (props.value) {
      props.getClick(props.value, props.title);
    }
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      clickHandler();
    }
  };
  
  let buttonClasses = [];
  if (props.type === 'disabled') {
    buttonClasses = [classes.Button, classes.Disabled];
  }
  else {
    buttonClasses = [classes.Button, ( props.type === 'quick_reply' ? classes.Secondary : '')];
  }
  return (
    <button
      type="button"
      //ref={(node) => { button = node; }}
      style={props.style}
      onKeyPress={handleKeypress}
      className={buttonClasses.join(" ")}
      disabled={props.isDisabled}
      onClick={clickHandler}
    >
      <span>{props.title}</span>
    </button>
  );
};
export default Button;
