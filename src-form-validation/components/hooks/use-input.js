import { useReducer } from "react";

const intialValue = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.val, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return intialValue;
};

const useInput = (validateValue) => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    intialValue
  );

  const valueIsValid = validateValue(inputState.value);

  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangedHandler = (event) => {
    dispatchInput({
      type: "INPUT",
      val: event.target.value,
    });
  };

  const onBlurHandler = () => {
    dispatchInput({
      type: "BLUR",
    });
  };

  const reset = () => {
    dispatchInput({
      type: "RESET",
    });
  };

  return {
    value: inputState.value,
    hasError,
    onBlurHandler,
    valueChangedHandler,
    valueIsValid,
    reset,
  };
};

export default useInput;
