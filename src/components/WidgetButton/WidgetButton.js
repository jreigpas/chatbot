import React, { useState } from "react";

import { ReactComponent as CloseIcon } from "../../assets/images/close-bubble-icon.svg";
import widgetImage from "../../assets/images/widget-img.png";
import classes from "./WidgetButton.module.css";
import Bubble from "./Bubble/Bubble";
import { useTranslation } from "react-i18next";

const WidgetButton = (props) => {
  const { t } = useTranslation("global");
  const [showBubble, setShowBubble] = useState(true);

  const hideBubble = () => {
    setShowBubble(false);
  };

  const buttonClicked = (option) => {
    setShowBubble(true);
    props.click(option);
  };

  let bubble = "";

  if (showBubble) {
    // eslint-disable-next-line no-unused-vars
    bubble = <Bubble close={hideBubble} />;
  }

  let widget = "";

  if (props.show) {
    widget = (
      <div
        className={classes.WidgetButtonContainer}
        role="region"
        aria-label={t("widget.title")}
      >
        

        <button
          id="cbWidgetButton"
          className={classes.WidgetButton}
          onClick={() => buttonClicked('chat')}
          title={t("widget.button.title")}
          aria-label={t("widget.button.title")}
        >
          <img src={widgetImage} alt="Open ChatBot" />
        </button>

        <button
          id="cbWidgetSmallButton"
          tabIndex="0"
          className={classes.CloseButton}
          onClick={() => buttonClicked('smallButton')}
          title={t("widget.bubble.close")}
          aria-label={t("widget.bubble.close")}
        >
          <CloseIcon />
        </button>
      </div>
    );
  }

  return <React.Fragment>{widget}</React.Fragment>;
};

export default WidgetButton;
