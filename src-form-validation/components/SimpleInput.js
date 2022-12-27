import { useRef } from "react";

import useInput from "./hooks/use-input";

const SimpleInput = () => {
  const {
    hasError: nameInputHasError,
    valueChangedHandler: nameChangedHandler,
    onBlurHandler: nameBlurHandler,
    valueIsValid: enteredNameIsValid,
    reset: resetNameInput,
  } = useInput((enteredValue) => enteredValue.trim() !== "");

  const {
    hasError: emailInputHasError,
    valueChangedHandler: emailChangedHandler,
    onBlurHandler: emailBlurHandler,
    valueIsValid: enteredEmailIsValid,
    reset: resetEmailIput,
  } = useInput((enteredValue) => enteredValue.includes("@"));

  const inputNameRef = useRef();
  const inputEmailRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid) {
      return;
    }
    inputNameRef.current.value = "";
    inputEmailRef.current.value = "";
    resetNameInput();
    resetEmailIput();
  };

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={inputNameRef}
          onChange={nameChangedHandler}
          type="text"
          id="name"
          onBlur={nameBlurHandler}
          placeholder="Name"
        />
        {nameInputHasError && (
          <p className="error-text">Name cannot be empty!</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <input
          ref={inputEmailRef}
          onChange={emailChangedHandler}
          type="email"
          id="email"
          onBlur={emailBlurHandler}
          placeholder="E-Mail"
        />
        {emailInputHasError && (
          <p className="error-text">Your email must include @</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
