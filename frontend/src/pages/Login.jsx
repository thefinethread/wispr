import Container from "../commonComponents/Container";
import Logo from "../assets/images/logo.png";
import AuthPageImage from "../assets/images/main-page.png";

const Login = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-between">
      <div className="absolute left-0 top-4 flex items-center justify-center gap-3">
        <img className="h-12 w-12 " src={Logo} alt="wispr" />
        <h2 className="font-comfortaa text-2xl font-bold">Wispr</h2>
      </div>
      <section className="flex w-full items-center justify-between">
        <div className="w-1/2">
          <h1 className="font-comfortaa inline-block w-min bg-gradient-to-r from-[#3cd0fa] to-blue-500 bg-clip-text  text-7xl font-bold  leading-[1.2] text-transparent">
            Hang out anytime, anywhere
          </h1>
        </div>
        <div className="w w-1/2">
          <img
            className="h-full w-full"
            src={AuthPageImage}
            alt="hero-section"
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
