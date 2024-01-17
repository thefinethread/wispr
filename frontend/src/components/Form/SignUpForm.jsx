import { useNavigate } from "react-router-dom";
import UnderlineLink from "../../commonComponents/styledComponents/UnderlineLink";
import GooglePng from "../../assets/images/google.png";
import Button from "../../commonComponents/Buttons/Button";
import Input from "../../commonComponents/Input/Input";
import FormControlStyled from "../../commonComponents/styledComponents/FormControlStyled";
import useInput from "../../hooks/useInput";
import {
  usernameCheck,
  passwordCheck,
  emailCheck,
} from "../../utils/form/formFieldsValidation";
import ValidationMessage from "../../commonComponents/styledComponents/ValidationMessage";
import Spinner from "../../commonComponents/Spinners/Spinner";
import ErrorMessage from "../../commonComponents/styledComponents/ErrorMessage";
import { useRegisterMutation } from "../../features/user/usersApiSlice";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "../../features/auth/authSlice";

const SignUpForm = ({ closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  let formIsValid = false;

  const {
    value: enteredUsername,
    isValid: isUsernameValid,
    inputBlurHandler: usernameBlurHandler,
    valueChangeHandler: usernameChangeHandler,
    hasError: usernameHasError,
    validationText: usernameContent,
    resetInput: resetUsernameInput,
  } = useInput(usernameCheck);

  const {
    value: enteredEmail,
    isValid: isEmailValid,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    hasError: emailHasError,
    validationText: emailContent,
    resetInput: resetEmailInput,
  } = useInput(emailCheck);

  const {
    value: enteredPassword,
    isValid: isPasswordValid,
    inputBlurHandler: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
    hasError: passwordHasError,
    validationText: passwordContent,
    resetInput: resetPasswordInput,
  } = useInput(passwordCheck);

  if (isUsernameValid && isEmailValid && isPasswordValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const resetInputs = () => {
    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const userData = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const { data } = await register(userData).unwrap();
      dispatch(saveUserInfo(data));
      resetInputs();
      closeModal();
      navigate("/chats");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-14 text-sm font-light">
      <form onSubmit={handleSignUp}>
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
        {isError && (
          <FormControlStyled>
            <ErrorMessage>{error?.data?.message}</ErrorMessage>
          </FormControlStyled>
        )}
        <Button type="submit" disabled={!formIsValid}>
          {isLoading ? <Spinner /> : "Sign Up"}
        </Button>
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
