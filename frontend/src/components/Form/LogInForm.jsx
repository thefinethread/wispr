import UnderlineLink from "../../commonComponents/styledComponents/UnderlineLink";
import GooglePng from "../../assets/images/google.png";
import Button from "../../commonComponents/Buttons/Button";
import Input from "../../commonComponents/Input/Input";
import FormControlStyled from "../../commonComponents/styledComponents/FormControlStyled";

const formFields = [
  {
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

const LogInForm = () => {
  return (
    <div className="p-14 text-sm font-light">
      <form className="">
        {formFields.map((field) => (
          <FormControlStyled key={field.name}>
            <Input placeholder={field.placeholder} />
          </FormControlStyled>
        ))}
        <Button type="submit">Log In</Button>
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
