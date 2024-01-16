import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue)?.isValid;
  const hasError = isTouched && !valueIsValid;
  const validationText = validateValue(enteredValue)?.message;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    hasError,
    validationText,
    resetInput,
  };
};

export default useInput;
