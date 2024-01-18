import { useState } from "react";
import AuthPageImage from "../assets/images/homescreen.png";
import Modal from "../commonComponents/Modal/Modal";
import Logo from "../assets/images/logo.png";
import ButtonStyled from "../commonComponents/styledComponents/ButtonStyled";
import SignUpForm from "../components/Form/SignUpForm";
import LogInForm from "../components/Form/LogInForm";
import { Link } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formModal, setFormModal] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleModalOpen = (e) => {
    setIsModalOpen(true);

    e.target.id === "log-in" ? setFormModal("log-in") : setFormModal("sign-up");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        {formModal === "log-in" ? (
          <LogInForm closeModal={handleCloseModal} />
        ) : (
          <SignUpForm closeModal={handleCloseModal} />
        )}
      </Modal>
      <div className="flex w-full items-center justify-between py-4">
        <Link to="/">
          <div className="flex items-center justify-center gap-2">
            <img className="h-10 w-10 " src={Logo} alt="wispr" />
            <h2 className="font-comfortaa text-xl font-bold">Wispr</h2>
          </div>
        </Link>
        <nav className="flex gap-4">
          <ButtonStyled id="log-in" onClick={handleModalOpen}>
            Log In
          </ButtonStyled>
          <ButtonStyled id="sign-up" onClick={handleModalOpen}>
            Sign Up
          </ButtonStyled>
        </nav>
      </div>
      <section className="flex w-full flex-1 items-center justify-between">
        <div className=" w-1/2">
          <h1 className="inline-block w-min bg-gradient-to-r from-[#3cd0fa] to-blue-500 bg-clip-text font-comfortaa text-7xl  text-[6vw] font-bold  leading-[1.2] text-transparent">
            Hang out anytime, anywhere
          </h1>
          <p className="mt-5 max-w-[70%] text-skin-muted">
            Wispr makes it easy and fun to stay close to your favourite people.
          </p>
        </div>
        <div className="flex-1">
          <img
            className="w-4/5 object-cover"
            src={AuthPageImage}
            alt="hero-section"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
