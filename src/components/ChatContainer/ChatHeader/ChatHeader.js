import React from "react";
import { useTranslation } from "react-i18next";

import classes from "./ChatHeader.module.css";
import widgetIcon from "../../../assets/images/widget-img.png";
import { ReactComponent as CloseIcon } from "../../../assets/images/rectangle-icon.svg";
//import { ReactComponent as MoveIcon } from "../../../assets/images/move-icon.svg";

const ChatHeader = (props) => {
  const { t } = useTranslation("global");

  const buttonClicked = (option) => {
    props.close(option);
  };

  return (
    <div
      className={classes.ChatHeader}
      role="region"
      aria-label={t("chatheader.title")}
    >
      <div className={classes.HeaderAndLogo}>    
        <img src={widgetIcon} alt="Open ChatBot" className={classes.Logo} />        
        <div className={classes.Title}>LineaMadrid</div>
      </div>
      <div className={classes.MoveAndCloseIcon}>        
        <button
          className={classes.CloseButton}
          onClick={() => buttonClicked('chat')}
          title={t("chatheader.close")}
          aria-label={t("chatheader.close")}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
