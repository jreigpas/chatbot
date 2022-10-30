import React, { useState } from "react";

import classes from "./Download.module.css";
import { ReactComponent as DownloadIcon } from "../../../assets/images/download-icon.svg";

import axios from "axios";

const Download = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [clicked, setClicked] = useState(false);

  const clickHandler = () => {
    setClicked(true);

    axios({
      url: props.url,
      method: "GET",
      responseType: "blob", // important
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", props.file);
        document.body.appendChild(link);
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        props.click(props.downloadOk, props.title);
      })
      .catch((err) => {
        props.click(props.downloadKo, props.title);
      });
  };

  const downloadClasses = [
    classes.Download,
    classes[`Download--${props.type}`],
  ];

  // if (this.state.clicked){
  //   downloadClasses.push(classes.Download--clicked)
  // }
  return (
    <button
      type="button"
      style={props.style}
      className={downloadClasses.join(" ")}
      disabled={props.isDisabled}
      onClick={clickHandler}
    >
      <DownloadIcon />
      <span>{props.title}</span>
    </button>
  );
};
export default Download;
