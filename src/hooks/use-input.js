import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const inputValueIsTouched = (value) => {
    setIsTouched(value);
  };

  const changeEnteredValue = (value) => {
    setEnteredValue(value);
  };

  const valueInputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const valueInputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const valueInputClasses = hasError ? "form-control invalid" : "form-control";

  return {
    value: enteredValue,
    hasError,
    valueIsValid,
    valueInputChangeHandler,
    valueInputBlurHandler,
    valueInputClasses,
    inputValueIsTouched,
    changeEnteredValue,
  };
};

export default useInput;
