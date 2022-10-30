import React from "react";

import { useTranslation } from "react-i18next";
import classes from "./Bubble.module.css";

const Bubble = (props) => {
  const { t } = useTranslation("global");

  return (
    <React.Fragment>
      <div
        className={classes.BubbleContainer}
        role="region"
        aria-label={t("widget.bubble.title")}
      >
        <button tabIndex="0" className={classes.Bubble} onClick={props.click}>
          <span
            dangerouslySetInnerHTML={{ __html: t("widget.bubble.text1") }}
          />
          <span
            dangerouslySetInnerHTML={{ __html: t("widget.bubble.text2") }}
          />
        </button>
        {/* <button
          tabIndex="0"
          className={classes.CloseButton}
          onClick={(e) => {
            e.stopPropagation();
            props.close();
          }}
          title={t("widget.bubble.close")}
          aria-label={t("widget.bubble.close")}
        >
          <CloseIcon />
        </button> */}
      </div>
    </React.Fragment>
  );
};
export default Bubble;
