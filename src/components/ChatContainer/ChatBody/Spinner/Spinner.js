import React from "react";

import classes from "./Spinner.module.css";

const Spinner = (props) => {
  return (
    <div className={classes.Spinner}>
      <div className={classes.DotContainer}>
        <div className={classes.Dot}></div>
        <div className={classes.Dot}></div>
        <div className={classes.Dot}></div>
      </div>
    </div>
  );
};
export default Spinner;
