// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

import classes from "./QuickReply.module.css";
import Button from "../Button/Button";

const QuickReply = (props) => {
  /*const [disabled, setDisabled]=useState(false);

  useEffect(() => {
    // focusing the first button of new quickreply
    firstButton.button.focus();
    const clickHandler = (value, altText) => {
      if(!disabled){
        if (value) props.selected(value, altText);
      }
    }
  
  }, []);
*/
  const messageClasses = [
    classes[`${props.origin}-message`],
    classes.QuickReply,
  ];
  if (props.payload.buttons.length > 2) {
    messageClasses.push(classes.VerticalButtons);
  }

  const options = props.payload.buttons.map((btn, index) => (
    <li key={index}>
      <Button
        //ref={index === 0 ? (button) => { firstButton = button; } : null}
        key={index}
        title={btn.title}
        value={btn.value}
        action={btn.action}
        type={btn.type}
        click={props.selected}
        style={props.buttonStyle}
        getClick={props.getClick}
      />
    </li>
  ));
  return (
    <div className={messageClasses.join(" ")} style={props.style}>
      {options}
    </div>
  );
};
export default QuickReply;
