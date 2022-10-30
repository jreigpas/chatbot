import React from "react";

import classes from "./TextMessage.module.css";

const TextMessage = (props) => {
  const messageClasses = [
    classes[`${props.origin}-message`],
    classes.TextMessage,
    classes.imageAvatar,
  ];

  return (
    <>
      {!props.fromUser && props.agentChat ? (
        <div>
          <div className={classes.WithAvatar}>
            <img className={classes.ImgAvatar} src="iconoAvatar.jpeg" alt="Person" />
            <div>
              <div className={messageClasses.join(" ")} style={props.style}>
                <span
                  dangerouslySetInnerHTML={{ __html: props.payload.text }}
                />
              </div>
              <small>
                {props.now}
                {props.fromUser}
              </small>
            </div>
          </div>
        </div>
      ) : (
        <div className={messageClasses.join(" ")} style={props.style}>
          <span dangerouslySetInnerHTML={{ __html: props.payload.text }} />
        </div>
      )}
    </>
  );
};
export default TextMessage;
