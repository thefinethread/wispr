import UnderlineLink from "../../commonComponents/styledComponents/UnderlineLink";
import GooglePng from "../../assets/images/google.png";
import Button from "../../commonComponents/Buttons/Button";
import Input from "../../commonComponents/Input/Input";
import FormControlStyled from "../../commonComponents/styledComponents/FormControlStyled";
import useInput from "../../hooks/useInput";
import {
  passwordCheck,
  emailCheck,
} from "../../utils/form/formFieldsValidation";
import ValidationMessage from "../../commonComponents/styledComponents/ValidationMessage";

const LogInForm = () => {
  let formIsValid = false;

  const {
    value: enteredEmail,
    isValid: isEmailValid,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    hasError: emailHasError,
    validationText: emailContent,
  } = useInput(emailCheck);

  const {
    value: enteredPassword,
    isValid: isPasswordValid,
    valueChangeHandler: passwordChangeHandler,
  } = useInput(passwordCheck);

  if (isEmailValid && isPasswordValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const handleLogIn = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredEmail, enteredPassword);
  };

  return (
    <div className="p-14 text-sm font-light">
      <form onSubmit={handleLogIn}>
        <FormControlStyled>
          <Input
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="Email"
            name="email"
            type="email"
            error={emailHasError}
            required={true}
          />
          {emailHasError && <ValidationMessage msg={emailContent} />}
        </FormControlStyled>
        <FormControlStyled>
          <Input
            value={enteredPassword}
            onChange={passwordChangeHandler}
            placeholder="Password"
            name="password"
            type="password"
            required={true}
          />
        </FormControlStyled>
        <Button type="submit" disabled={!formIsValid}></Button>
      </form>
      <div className="my-4 text-[13px] font-normal text-zinc-500">
        <UnderlineLink className="after:h-[1px]">
          Forgot password?
        </UnderlineLink>
      </div>
      <div className="relative my-10 flex h-[1px] w-full items-center justify-center bg-zinc-300">
        <span className="bg-white px-5">or</span>
      </div>
      <div className="mt">
        <Button version="secondary">
          <img className="h-6 w-6" src={GooglePng} alt="" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default LogInForm;
