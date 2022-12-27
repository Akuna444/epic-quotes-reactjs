import { useRef } from "react";
import useInput from "./hooks/use-input";

const BasicForm = (props) => {
  const {
    hasError: firstNameHasError,
    valueChangedHandler: firstNameChangedHandler,
    onBlurHandler: firstNameBlurHandler,
    valueIsValid: firstNameIsValid,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    hasError: lastNameHasError,
    valueChangedHandler: lastNameChangedHandler,
    onBlurHandler: lastNameBlurHandler,
    valueIsValid: lastNameIsValid,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    hasError: emailHasError,
    valueChangedHandler: emailChangedHandler,
    onBlurHandler: emailBlurHandler,
    valueIsValid: emailIsValid,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    firstNameReset();
    lastNameReset();
    emailReset();
  };
  const firstNameInputClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name"> First Name</label>
          <input
            ref={firstNameRef}
            type="text"
            id="name"
            onChange={firstNameChangedHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text"> First Name can't be empty</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name"> Last Name</label>
          <input
            ref={lastNameRef}
            type="text"
            id="name"
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text"> Last Name can't be empty</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="name">E-Mail Address</label>
          <input
            ref={emailRef}
            type="text"
            id="name"
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p className="error-text">Enter correct E-Mail</p>}
        </div>
        <div className="form-actions">
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
