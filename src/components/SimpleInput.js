import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueIsValid: nameInputIsValid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    valueInputClasses: nameInputClasses,
    inputValueIsTouched: nameInputValueIsTouched,
    changeEnteredValue: nameValueChanged,
  } = useInput((name) => {
    return name.trim() !== "";
  });

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueIsValid: emailInputIsValid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    valueInputClasses: emailInputClasses,
    inputValueIsTouched: emailInputValueIsTouched,
    changeEnteredValue: emailValueChanged,
  } = useInput((email) => {
    return email.includes("@");
  });

  let formIsValid = false;

  if (nameInputIsValid && emailInputIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    //it makes sense to consider input field to touched once user submits the form
    //and at this point it doesn't matter whether entered value is valid or not.
    nameInputValueIsTouched(true);
    emailInputValueIsTouched(true);

    if (!nameInputIsValid || !emailInputIsValid) {
      return;
    }

    console.log(enteredName);

    nameValueChanged("");
    emailValueChanged("");

    nameInputValueIsTouched(false);
    emailInputValueIsTouched(false);
  };

  const nameClasses = nameInputClasses;
  const emailClasses = emailInputClasses;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      {nameInputHasError && (
        <p className="error-text">Name field cannot be empty.</p>
      )}
      <div className={emailClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      {emailInputHasError && (
        <p className="error-text">
          Email field cannot be empty and must contain @ character.
        </p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
