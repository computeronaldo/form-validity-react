import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      ...state,
      value: action.value,
    };
  } else if (action.type === "BLUR") {
    return {
      ...state,
      isTouched: action.value,
    };
  }
  return {
    value: "",
    isTouched: false,
  };
};

const useInput = (validateValue) => {
  const [inputState, dispatchFn] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputValueIsTouched = (value) => {
    dispatchFn({ type: "BLUR", value: value });
  };

  const changeEnteredValue = (value) => {
    dispatchFn({ type: "INPUT", value: value });
  };

  const valueInputChangeHandler = (e) => {
    dispatchFn({ type: "INPUT", value: e.target.value });
  };

  const valueInputBlurHandler = (e) => {
    dispatchFn({ type: "BLUR", value: true });
  };

  const valueInputClasses = hasError ? "form-control invalid" : "form-control";

  return {
    value: inputState.value,
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
