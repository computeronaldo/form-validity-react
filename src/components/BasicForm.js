import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    valueIsValid: firstNameInputIsValid,
    valueInputChangeHandler: firstNameInputChangeHandler,
    valueInputBlurHandler: firstNameInputBlurHandler,
    valueInputClasses: firstNameInputClasses,
    inputValueIsTouched: firstNameInputValueIsTouched,
    changeEnteredValue: firstNameInputValueChanged,
  } = useInput((name) => name.trim() !== "");

  const {
    value: enteredLastName,
    hasError: lastNameInputHasError,
    valueIsValid: lastNameInputIsValid,
    valueInputChangeHandler: lastNameInputChangeHandler,
    valueInputBlurHandler: lastNameInputBlurHandler,
    valueInputClasses: lastNameInputClasses,
    inputValueIsTouched: lastNameInputValueIsTouched,
    changeEnteredValue: lastNameInputValueChanged,
  } = useInput((name) => name.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueIsValid: emailInputIsValid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    valueInputClasses: emailInputClasses,
    inputValueIsTouched: emailInputValueIsTouched,
    changeEnteredValue: emailValueChanged,
  } = useInput((email) => email.includes("@"));

  let formIsValid = false;

  if (firstNameInputIsValid && lastNameInputIsValid && emailInputIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    //it makes sense to consider input field to touched once user submits the form
    //and at this point it doesn't matter whether entered value is valid or not.
    firstNameInputValueIsTouched(true);
    lastNameInputValueIsTouched(true);
    emailInputValueIsTouched(true);

    if (!firstNameInputIsValid || !lastNameInputIsValid || !emailInputIsValid) {
      return;
    }

    console.log(enteredFirstName, enteredLastName, enteredEmail);

    firstNameInputValueChanged("");
    lastNameInputValueChanged("");
    emailValueChanged("");

    firstNameInputValueIsTouched(false);
    lastNameInputValueIsTouched(false);
    emailInputValueIsTouched(false);
  };

  const firstNameClasses = firstNameInputClasses;
  const lastNameClasses = lastNameInputClasses;
  const emailClasses = emailInputClasses;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={enteredFirstName}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
        </div>
        {firstNameInputHasError && (
          <p className="error-text">First name field cannot be empty.</p>
        )}
        <div className={lastNameClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={enteredLastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
        </div>
        {lastNameInputHasError && (
          <p className="error-text">Last name field cannot be empty.</p>
        )}
        <div className={emailClasses}>
          <label htmlFor="email">Email Address</label>
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
            Email address field cannot be empty and must contain @ character.
          </p>
        )}
        <div className="form-actions">
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
