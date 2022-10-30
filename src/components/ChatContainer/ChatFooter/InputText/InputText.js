import React, { useState, useRef, useEffect} from "react";
import { useTranslation } from "react-i18next";
import classes from "./InputText.module.css";
import data from './suggestions/suggestions.json';
//import TagManager from 'react-gtm-module'

const InputText = (props, {options = []}) => {
  const { t } = useTranslation("global");
  // eslint-disable-next-line no-unused-vars
  const [isDisabled, setIsDisabled] = useState(false);
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  options = data;
  const inputRef = useRef(null);
  const suggestions = options.filter((option) => (value.trim().length > 2) ? option.toLowerCase().includes(value.toLowerCase()) : '');

  const changeHandler = (e) => {
    setValue(e.target.value);
    props.setInputValue(e.target.value);
    props.getData(e.target.value);
  };

  useEffect(() => {
    setValue('');
    setShowSuggestions(false);
  }, [props.reset]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      setValue('');
    }
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      e.preventDefault();
      // TagManager.dataLayer({
      //   dataLayer: {
      //     userId: '001',
      //     userProject: 'chatBot',
      //     page: 'footer'
      //    }
      // });
      // console.log('datalayer');
      // console.log(TagManager.dataLayer);
      setShowSuggestions(false);
      props.sendInputValue(e.target.value);
    }
    else {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setValue('');
    props.sendSuggestion(suggestion);
    setShowSuggestions(false);
  }; 

  return (
    <>
    <textarea
      value={value}
      className={classes.InputText}
      type="text"
      placeholder={t("chatfooter.input.placeholder")}
      title={t("chatfooter.input.title")}
      aria-label={t("chatfooter.input.title")}
      onChange={changeHandler}
      onKeyPress={handleKeypress}
      onKeyDown={onKeyDown}
      disabled={props.setDisabled}
      ref={inputRef}
      rows={(value.length > 32) ? 2:1}
    />
    {showSuggestions && (
      <ul className={classes.suggestions}>
        {suggestions.map((suggestion) => (
          <li              
            onClick={() => handleSuggestionClick(suggestion)}              
            key={suggestion}
          >
            {suggestion}
          </li>
        ))}
      </ul>
            )}
            </>
  );
};

export default InputText;
