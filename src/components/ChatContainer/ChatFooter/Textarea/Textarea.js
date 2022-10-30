import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useSpeechToText from "react-hook-speech-to-text";
import classes from "./Textarea.module.css";
//import micIcon from "../../../../assets/images/mic.svg";
//import keyboardIcon from "../../../../assets/images/keyboard-icon.svg";

const Textarea = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation("global");
  // eslint-disable-next-line no-unused-vars
  const recordButtonClasses = [classes.RecordButton];
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState("");

  // const changeHandler = (e) => {
  //   props.setInputValue(e.target.value);
  // };

  const handleChange = (e) => {
    setValue(JSON.stringify(interimResult));
    props.setInputValue(e.target.value);
    console.log("JSON.stringify(interimResult)", JSON.stringify(interimResult));
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      props.sendInputValue(e.target.value);
    }
  };

  const clickHandlerKeyboard = () => {
    stopSpeechToText();
    props.setKeyBoardMode(true);
  };

  const {
    error,
    interimResult,
    // eslint-disable-next-line no-unused-vars
    isRecording,
    // eslint-disable-next-line no-unused-vars
    results,
    // eslint-disable-next-line no-unused-vars
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  //if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  console.log(error);

  return (
    <>
      {/* TO-DO: temporal delete after test */}
      {/* <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
      <textarea
        className={classes.Textarea}
        name="commentTextArea"
        type="text"
        rows="1"
        onChange={handleChange}
        onKeyPress={handleKeypress}
        value={props.setVal}
      />
      {/* <button onClick={isRecording ? stopSpeechToText : startSpeechToText}  className={recordButtonClasses.join(" ")}>      
      <img data-recording={isRecording} src={micIcon} alt="" />
    </button> */}
      <button
        className={classes.ChatFooterKeyboardButton}
        onClick={clickHandlerKeyboard}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          role="img"
          aria-label="Speak a message"
          className={classes.KeyboardButton}
        >
          <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"></path>
          <path d="M20 7v10H4V7h16m0-2H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2zm0 3h2v2h-2zM8 8h2v2H8zm0 3h2v2H8zm-3 0h2v2H5zm0-3h2v2H5zm3 6h8v2H8zm6-3h2v2h-2zm0-3h2v2h-2zm3 3h2v2h-2zm0-3h2v2h-2z"></path>
        </svg>
      </button>
    </>
  );
};

export default Textarea;
