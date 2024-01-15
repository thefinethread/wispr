import UnderlineLink from "../../commonComponents/styledComponents/UnderlineLink";
import GooglePng from "../../assets/images/google.png";
import Button from "../../commonComponents/Buttons/Button";
import Input from "../../commonComponents/Input/Input";
import FormControlStyled from "../../commonComponents/styledComponents/FormControlStyled";
import useInput from "../../hooks/useInput";

let usernameContent = "";
let emailContent = "";
let passwordContent = "";

const usernameCheck = (value) => {
  if (value.trim() === "") {
    usernameContent = "Username is required";
  } else {
    return value;
  }
};

const emailCheck = (value) => {
  if (value.trim() === "") {
    emailContent = "Email is required";
  } else if (!value.includes("@") || !value.includes(".")) {
    emailContent = "Email is invalid";
  } else {
    return value;
  }
};

const passwordCheck = (value) => {
  if (value.trim() === "") {
    passwordContent = "Password is required";
  } else if (value.trim()?.length < 4) {
    passwordContent = "Password must contain at least 4 characters";
  } else {
    return value;
  }
};

const ValidationMessage = ({ msg }) => {
  return <p className="mt-0.5 text-xs font-normal text-red-600">{msg}</p>;
};

const SignUpForm = () => {
  const {
    value: enteredUsername,
    inputBlurHandler: usernameBlurHandler,
    valueChangeHandler: usernameChangeHandler,
    hasError: usernameHasError,
  } = useInput(usernameCheck);

  const {
    value: enteredEmail,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    hasError: emailHasError,
  } = useInput(emailCheck);

  const {
    value: enteredPassword,
    inputBlurHandler: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
    hasError: passwordHasError,
  } = useInput(passwordCheck);

  return (
    <div className="p-14 text-sm font-light">
      <form>
        <FormControlStyled>
          <Input
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            placeholder="Username"
            name="username"
            type="text"
            error={usernameHasError}
            required={true}
          />
          {usernameHasError && <ValidationMessage msg={usernameContent} />}
        </FormControlStyled>
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
            onBlur={passwordBlurHandler}
            placeholder="Password"
            name="password"
            type="password"
            error={passwordHasError}
            required={true}
          />
          {passwordHasError && <ValidationMessage msg={passwordContent} />}
        </FormControlStyled>
        <Button type="submit">Sign Up</Button>
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

export default SignUpForm;
