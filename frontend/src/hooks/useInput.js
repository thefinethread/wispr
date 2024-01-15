import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const hasError = isTouched && !validateValue(enteredValue);

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
    console.log("blurred");
  };

  return {
    value: enteredValue,
    valueChangeHandler,
    inputBlurHandler,
    hasError,
  };
};

export default useInput;
