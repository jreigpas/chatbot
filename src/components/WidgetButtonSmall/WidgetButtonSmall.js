import React, { useState } from "react";
import widgetImage from "../../assets/images/widget-img-small.png";
import classes from "./WidgetButtonSmall.module.css";
import Bubble from "./Bubble/Bubble";
import { useTranslation } from "react-i18next";

const WidgetButton = (props) => {
  const { t } = useTranslation("global");
  const [showBubble, setShowBubble] = useState(true);

  const hideBubble = () => {
    setShowBubble(false);
  };

  const buttonClicked = (msg) => {
    setShowBubble(true);
    props.click(msg);
  };

  let bubble = "";

  if (showBubble) {
    bubble = <Bubble close={hideBubble} />;
  }

  let widget = "";

  if (props.show) {
    widget = (
      <div
        className={classes.WidgetSmall}
        role="region"
        aria-label={t("widget.title")}
      >
        {bubble}

        <button
          id="cbWidgetSmallButton2"
          className={classes.WidgetButtonSmall}
          onClick={() => buttonClicked('bigButton')}
          title={t("widget.button.title")}
          aria-label={t("widget.button.title")}
        >
          <img src={widgetImage} alt="Open ChatBot" />
        </button>
      </div>
    );
  }

  return <React.Fragment>{widget}</React.Fragment>;
};

export default WidgetButton;
