import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import classes from "./ChatBody.module.css";
import Spinner from "./Spinner/Spinner";
import TextMessage from "../../chatElements/TextMessage/TextMessage";
import QuickReply from "../../chatElements/QuickReply/QuickReply";
import Carousel from "../../chatElements/Carousel/Carousel";
import Card from "../../chatElements/Card/Card";
import Form from "../../chatElements/Form/Form";
import Image from "../../chatElements/Image/Image";
import Button from "../../chatElements/Button/Button";

const ChatBody = (props) => {
  const { t } = useTranslation("global");

  const chatBodyDiv = useRef(null);

  useEffect(() => {
    chatBodyDiv.current.scrollTop =
      chatBodyDiv.current.scrollHeight - chatBodyDiv.current.clientHeight;
  });

  const processMsgs = (messages) =>
    messages.map((msg, index) => {
      const origin = msg.fromUser ? "User" : "Bot";       

      //console.log("+++++++++++ msg",msg) ;         
      switch (msg.type) {
        case "text":
          //console.log("--TEXT--",msg.type);
          //console.log("--TEXT2--",origin)
          return (
            <TextMessage
              // ref={scrollTargetMessage}
              key={index}
              position={msg.position}
              origin={origin}
              fromUser={msg.fromUser}
              payload={msg.payload}
              agentChat={msg.agentChat}
              now={msg.now}
            /> 
          );
        case "quick_reply":
          //console.log("--QUICKREPLY--",msg.type)
          return (
            <QuickReply
              key={index}
              position={msg.position}
              origin={origin}
              payload={msg.payload}
              selected={props.sendMsg}
              getClick ={props.pushButton}
            />
          );
        case "CARRUSEL":
          console.log("--CARRUSEL--",msg.type)
          return (
            <Carousel key={index} origin={origin} type={msg.type}>
               {processMsgs(msg.payload.items)}
          </Carousel>
          );
        case "form":
          console.log("--FORM--",msg.type)
          const isDisabled = index !== messages.length - 1;
          return (
            <Form
              key={index}
              position={msg.position}
              origin={origin}
              payload={msg.payload}
              selected={props.sendMsg}
              isDisabled={isDisabled}
            />
          );
        case "card":
          console.log("--CARD--",msg.type)
          let constData = [];
          if (msg.buttonList) {
            constData = msg;
          }
          return (
            <Card
              key={index}
              position={msg.position}
              origin={origin}
              payload={constData}
              selected={props.sendMsg}
            />
          );
        case "image":
          console.log("--IMAGE--",msg.type)
          return <Image key={index} origin={origin} payload={msg.payload} />;
        case "buttons":
          console.log("--BUTTONS--",msg.type)
          return (
            <Button 
              key={index}
              position={msg.position}
              origin={origin}
              name={msg.name}
              value={msg.value}
              type={msg.flow}
              action={msg.action}
            />
          );
        default:          
          console.log("--DEFAULT--",msg.type)
          return (
            <TextMessage
              key={index}
              // ref={scrollTargetMessage}
              position={msg.position}
              origin="Bot"
              fromUser={msg.fromUser}
              setIsAgent={props.setIsAgent}
              agentChat={msg.agentChat}
              now={msg.now}
              payload={{ text: t("chatbody.error-msg") }}
            />
          );
      }
    });

  const msgElements = processMsgs(props.messages);

  return (
    <div
      className={classes.ChatBody}
      tabIndex="0"
      aria-live="polite"
      role="region"
      aria-label={t("chatbody.title")}
      ref={chatBodyDiv}
    >
      <div className={classes.MessagesContainer}>
        {msgElements}
        {props.showSpinner ? <Spinner /> : ""}
      </div>
    </div>
  );
};

export default ChatBody;
