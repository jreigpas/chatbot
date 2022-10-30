import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Autocomplete.module.css";

const AutoComplete = (props, {options = []}) => {
  options = [
    "Amsterdam",
    "Berlin",
    "London",
    "New York",
    "Paris",
    "Rome",
    "San Francisco",
    "Tokyo",
    "Washington DC",
    "Zurich",
    "Copenhagen",
    "Helsinki",
    "Madrid",
    "Reykjavik",
    "Stockholm",
    "Vancouver",
    "Vienna",
    "Zagreb",
    "Budapest",
    "Dublin",
    "Hamburg",
    "Krakow",
    "Lisbon",
    "Ljubljana",
  ];

  const { t } = useTranslation("global");
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    props.setInputValue(suggestion);
    setShowSuggestions(false);
  }; 

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.autocomplete}>
      <input
        value={value}
        placeholder="Search"
        onKeyPress={() => setShowSuggestions(true)}
        onChange={handleChange}
        title={t("chatfooter.input.title")}
        aria-label={t("chatfooter.input.title")}
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
    </div>
  );
};

export default AutoComplete;
