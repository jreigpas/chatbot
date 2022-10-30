import React, { useState } from "react";
import classes from "./Image.module.css";
import Backdrop from "../../hoc/Backdrop/Backdrop";

const Image = (props) => {
  const [fullSize, setFullSize] = useState(false);

  function hideFullSize() {
    setFullSize(false);
  }

  function showFullSize() {
    setFullSize(true);
  }

  const fullSizeImage = fullSize ? (
    <Backdrop fullWindow={true} show={fullSize} clicked={hideFullSize}>
      <img className={classes.FullSizeImage} src={props.payload.image} alt="" />
    </Backdrop>
  ) : null;

  return (
    <React.Fragment>
      <div className={classes.Image} style={props.style}>
        <img src={props.payload.image} onClick={showFullSize} alt="" />
      </div>
      {fullSizeImage}
    </React.Fragment>
  );
};
export default Image;
