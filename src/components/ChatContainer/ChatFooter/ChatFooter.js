import React, { useState, useEffect } from "react";
import classes from "./ChatFooter.module.css";
import { useTranslation } from "react-i18next";
//import AutoComplete from "./Autocomplete/Autocomplete";
import Textarea from "./Textarea/Textarea";
import InputText from "./InputText/InputText";
//import keyboardIcon from "../../../assets/images/keyboard-icon.svg";
//import { ReactComponent as SendImage } from "../../../assets/images/send-icon.svg";

import useSpeechToText from "react-hook-speech-to-text";

const ChatFooter = (props) => {
  const { t } = useTranslation("global");

  const recordButtonClasses = [classes.RecordButton];
  const sendButtonClasses = [classes.SendButton];
  const inputFile = [classes.inputFile];
  const ClassLabel = [classes.ClassLabel];

  // eslint-disable-next-line no-unused-vars
  const [isDisabled, setIsDisabled] = useState(true);
  //const chatFooterKeyboardButton = [classes.ChatFooterKeyboardButton];
  const [isModeKeyboard, setIsModeKeyboard] = useState(true);
  const [reset, doReset] = useState(false);

  /* google-speech */
  // eslint-disable-next-line no-unused-vars
  const [commentText, setCommentText] = useState("");

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   console.log(commentText);
  // };

  const {
    error,
    interimResult,
    isRecording,
    // eslint-disable-next-line no-unused-vars
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  //voice animation
  let rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(<div key={i} className={classes.items}></div>);
  }

  useEffect(() => {
    if (!isModeKeyboard) {
      if (interimResult === undefined) {
        if (commentText.length > 0) {
          props.sendVoice(commentText);
          clickHandlerKeyboard();
        }
      } else {
        setCommentText(interimResult);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interimResult]);

  const clickHandlerVoice = () => {
    setIsModeKeyboard(false);
    isRecording ? stopSpeechToText() : startSpeechToText();
  };

  const clickHandlerKeyboard = () => {
    setIsModeKeyboard(true);
    stopSpeechToText();
  };

  const clickHandlerSend = () => {
    props.send();
    doReset(!reset);
    setIsDisabled(true);
  };

  const getData = (data) => {
    setIsDisabled(data.length <= 0 ? true : false);
  };

  const handleFileRead = async (event) => {
    
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    const myArray = base64.split(",");
    let base64Data = myArray[1];

    const dataSend = {
      name: "prueba.pdf",
      originalBase64: base64Data,
      type: "application/pdf"
    };
    props.directSocketConnection
      .sendAttachment(dataSend)
      .then((response) => {
        console.log("responseAttachment", response);
      })
      .catch((err) => console.log(err));

  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  /* / google-speech */
  console.log(error);

  return (
    <div
      className={classes.ChatFooter}
      role="region"
      aria-label={t("chatfooter.title")}
    >
      {isModeKeyboard && (
        <div className={classes.ChatFooterModeKeyboard}>
          <InputText
            setInputValue={props.setInputValue}
            sendInputValue={props.send}
            reset={reset}
            getData={getData}
            sendSuggestion={props.sendSuggestion}
            setDisabled={props.setDisabled}
          />
          {/* <AutoComplete 
          setInputValue={props.setInputValue}
        />  */}
          <button
            className={sendButtonClasses.join(" ")}
            onClick={clickHandlerSend}
            disabled={props.setDisabled}
            title="Enviar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Send a message"
              className={sendButtonClasses}
            >
              <path
                d="M23.794125,0.206015625 C23.5952344,0.007078125 23.2968281,-0.05409375 23.0358281,0.05034375 L0.44203125,9.08775 C0.183515625,9.19115625 0.01040625,9.43734375 0.00046875,9.71564063 C-0.009421875,9.99389063 0.145828125,10.25175 0.396328125,10.37325 L9.30576563,14.6942344 L13.6267969,23.6036719 C13.7446406,23.8466719 13.9907344,24 14.2592813,24 C14.267625,24 14.2760156,24 14.2844063,23.9995313 C14.5626094,23.9896406 14.8088906,23.8165313 14.91225,23.5580156 L23.94975,0.964359375 C24.0541875,0.703171875 23.9930156,0.40490625 23.794125,0.206015625 Z M2.44190625,9.80240625 L20.3775,2.62823437 L9.68864063,13.317 L2.44190625,9.80240625 Z M14.1976406,21.5581406 L10.683,14.3113125 L21.3719063,3.62254687 L14.1976406,21.5581406 Z"
                id="Shape"
              ></path>
            </svg>
          </button>

          <button
            onClick={clickHandlerVoice}
            className={recordButtonClasses.join(" ")}
            title="Hablar un mensaje"
            disabled={props.setDisabled}
          >
            <svg
              data-recording={isRecording}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Speak a message"
              className={recordButtonClasses}
            >
              <path d="M7 23v-2h4v-2.062C7.06 18.444 4 15.073 4 11h2c0 3.309 2.691 6 6 6s6-2.691 6-6h2c0 4.072-3.059 7.444-7 7.938V21h4v2h-6zm5-22c2.206 0 4 1.794 4 4v6c0 2.206-1.794 4-4 4s-4-1.794-4-4V5c0-2.206 1.794-4 4-4zm0 2c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2s2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
            </svg>
          </button>
          {props.setIsAgent && <label className={ClassLabel}>
            <input
              id="originalFileName"
              type="file"
              required
              label="Document"
              name="originalFileName"
              onChange={(e) => handleFileRead(e)}
              size="small"
              className={inputFile}
              disabled={props.setDisabled}
            />
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="24"
              y="24"
              viewBox="0 0 512 512"
              className={recordButtonClasses}
            >
              <path
                d="M467.076,68.86c-59.902-59.902-156.846-59.896-216.741,0L34.919,284.276c-46.558,46.557-46.558,122.312,0,168.87
			c46.57,46.571,122.326,46.544,168.87,0L419.205,237.73c33.36-33.36,33.36-87.64,0-121c-33.359-33.361-87.64-33.361-121,0
			L114.478,300.457c-6.975,6.975-6.975,18.285,0,25.259c6.975,6.975,18.285,6.975,25.259,0l183.727-183.727
			c19.432-19.432,51.05-19.432,70.481,0c19.431,19.432,19.431,51.05,0,70.481L178.53,427.887c-32.71,32.71-85.646,32.706-118.352,0
			c-15.806-15.806-24.511-36.821-24.511-59.175s8.706-43.369,24.511-59.176L275.594,94.119c45.94-45.94,120.287-45.934,166.222,0
			c45.827,45.828,45.827,120.395,0,166.222l-95.741,95.741c-6.975,6.975-6.975,18.284,0,25.259s18.285,6.975,25.259,0l95.741-95.741
			C526.978,225.7,526.971,128.754,467.076,68.86z"
              />
            </svg>
          </label>}
        </div>
      )}

      {!isModeKeyboard && (
        <div className={classes.ChatFooterModeVoice}>
          <div className={classes.ChatFooterVisualizerWrapper}>
            <div className={classes.wave}>{rows}</div>
            {/* <button className={chatFooterKeyboardButton} onClick={clickHandlerKeyboard} >
              <img src={keyboardIcon} alt="" />
            </button> */}
          </div>
          <div className={classes.ChatFooterRecognitionWrapper}>
            <Textarea
              setInputValue={props.setInputValue}
              sendInputValue={props.send}
              setKeyBoardMode={clickHandlerKeyboard}
              setVal={interimResult}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatFooter;
