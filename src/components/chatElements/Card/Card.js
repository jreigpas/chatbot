import React from "react";
import { useTranslation } from "react-i18next";
import classes from "./Card.module.css";
import Button from "../Button/Button";
import Download from "../Download/Download";

const Card = (props) => {
  const { t } = useTranslation("global");
  const messageClasses = [classes[`${props.origin}-message`], classes.Card];

  const clickHandler = (value, altBtnText) => {
    if (value) props.selected(value, altBtnText);
  };

  let buttons = "";

if (props.payload){
  buttons = props.payload.buttonList
  .map((btn, index) => (
    <li key={index}>
      <Button
        key={index}
        title={btn.title}
        value={btn.value}
        action={btn.action}
        type={btn.type}
        style={props.buttonStyle}
        click={clickHandler}
      />
    </li>
  ));
  }

  //falta download
  let downloads = "";

  downloads = props.payload && props.payload.downloads
    ? props.payload.downloads.map((dl, index) => (
        <li key={index}>
          <Download
            title={dl.title}
            url={dl.url}
            type={dl.type}
            file={dl.file}
            downloadKo={dl.downloadKo}
            downloadOk={dl.downloadOk}
            style={props.dowloadStyle}
            click={clickHandler}
          />
        </li>
      ))
    : "";
  const image = props.payload && props.payload.image ? (
    <div className={classes.Image}>
      <img
        src={props.payload.image}
        alt={props.payload.title}
        aria-label={t("card.image")}
      />
    </div>
  ) : (
    ""
  );

  const title = props.payload && props.payload.title ? (
    <div className={classes.Title} aria-label={t("card.title")}>
      {props.payload.title}
    </div>
  ) : (
    ""
  );

  const description = props.payload && props.payload.text ? (
    <div className={classes.Description} aria-label={t("card.description")}>
      <div dangerouslySetInnerHTML={{ __html: props.payload.text }} />
    </div>
  ) : (
    ""
  );

  const buttonContainer = props && props.payload.buttonList.length ? (
    <ul className={classes.Buttons} aria-label={t("card.buttons")}>
      {buttons}
    </ul>
  ) : (
    ""
  );

  const downloadsContainer = props.payload && props.payload.downloads ? (
    <ul
      className={[classes.Buttons, classes.Downloads].join(" ")}
      aria-label={t("card.downloads")}
    >
      {downloads}
    </ul>
  ) : (
    ""
  );

  return (
    <div
      className={messageClasses.join(" ")}
      style={props.style}
      role="region"
      tabIndex="0"
      aria-label={t("card.header")}
    >
      {image}
      <div className={classes.Info}>
        {title}
        {description}
        {buttonContainer}
        {downloadsContainer}
      </div>
    </div>
  );
};

export default Card;
