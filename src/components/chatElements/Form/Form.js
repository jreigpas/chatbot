import React, { useState, useEffect } from "react";
import classes from "../Form/Form.module.css";
import Button from "../Button/Button";
import Select from "../Form/Select/Select";
import Checkbox from "../Form/Checkbox/Checkbox";
import TextInput from "./TextInput/TextInput";
import { useTranslation } from "react-i18next";

const Form = (props) => {
  const { t } = useTranslation("global");
  const [id, setId] = useState("");
  const [inputs, setInputs] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [disabled, setDisabled] = useState(props.isDisabled);

  useEffect(() => {
    // inputs
    const inputsArray = props.payload.inputs.map((inpt) => {
      return {
        ...{
          value: inpt.value || "",
          altText: "",
          isValid: !inpt.required, //if is required, isValid = false by default
          errorMessage: t("form.defaultError"),
        },
        ...inpt,
      };
    });

    setId(props.payload.id);
    setInputs(inputsArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendHandler = (value, altBtnText) => {
    const errors = !!inputs.find((inpt) => !inpt.isValid);

    if (errors) {
      setShowErrors(errors);
      return;
    }

    const payload = {
      form: {
        id: id,
        inputs: inputs.map((inpt) => ({ id: inpt.id, value: inpt.value })),
      },
    };
    let altText = inputs.map((inpt) => inpt.altText);
    altText = altText.filter((n) => n).join(", ");
    props.selected(value, altText || altBtnText, payload);
    setDisabled(true);
  };

  const skipHandler = (value, altBtnText) => {
    props.selected(value, altBtnText);
    setDisabled(true);
  };

  const validate = (input) => {
    let isValid = true;
    let errorMessage = input.errorMessage;

    if (input.required && !input.value) {
      isValid = false;
    }
    if (input.validations) {
      for (let i = 0; i < input.validations.length; i++) {
        var re = new RegExp(input.validations[i].regex);
        if (!re.test(input.value)) {
          isValid = false;
          errorMessage = input.validations[i].errorMessage;
          break;
        }
      }
    }

    return [isValid, errorMessage];
  };

  const setValues = (id, value, altText) => {
    const inputsArray = [...inputs];
    const target = inputsArray.find((inpt) => inpt.id === id);
    target.value = value;
    target.altText = altText;
    [target.isValid, target.errorMessage] = validate(target);

    setInputs(inputsArray);
  };

  const checkDisabled = () =>
    !inputs.find((inpt) => inpt.required && !inpt.value);

  const messageClasses = [classes[`${props.origin}-message`], classes.Form];

  let input = "";

  input = inputs.map((inpt, index) => {
    let inputElement = "";
    switch (inpt.type) {
      case "select":
        inputElement = (
          <Select setValue={setValues} isDisabled={disabled} {...inpt} />
        );
        break;
      case "text":
        inputElement = (
          <TextInput
            setValue={setValues}
            isDisabled={disabled}
            showErrors={showErrors}
            {...inpt}
          />
        );
        break;
      case "checkbox":
        inputElement = (
          <Checkbox
            setValue={setValues}
            isDisabled={disabled}
            showErrors={showErrors}
            {...inpt}
          />
        );
        break;
      default:
        break;
    }
    return <li key={index}>{inputElement}</li>;
  });

  const inputsContainer = (
    <ul className={classes.Inputs} aria-label={t("form.inputs")}>
      {input}
    </ul>
  );

  let buttons = "";

  buttons = props.payload.buttons.map((btn, index) => {
    const handler = btn.type === "cancel" ? skipHandler : sendHandler;
    const isDisabled = btn.type === "cancel" ? false : checkDisabled();

    return (
      <li key={index}>
        <Button
          title={btn.title}
          value={btn.value}
          action={btn.action}
          type={btn.type}
          style={props.buttonStyle}
          isDisabled={isDisabled || disabled}
          click={handler}
        />
      </li>
    );
  });

  const buttonContainer = props.payload.buttons.length ? (
    <ul className={classes.Buttons} aria-label={t("form.buttons")}>
      {buttons}
    </ul>
  ) : (
    ""
  );

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={messageClasses.join(" ")}
      style={props.style}
      role="region"
      tabIndex="0"
      aria-label={t("form.header")}
    >
      <form id={props.id} className={classes.Info} onKeyPress={handleKeypress}>
        {inputsContainer}
        {buttonContainer}
      </form>
    </div>
  );
};

export default Form;
