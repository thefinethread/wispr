import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaRegEnvelope,
  FaRegUser,
} from "react-icons/fa6";
import { RiCameraLine, RiInformationLine, RiPencilLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const UserProfile = ({ isOpen, closeProfileSlider }) => {
  const { currentUser } = useSelector((state) => state.auth);

  const usernameRef = useRef();
  const aboutRef = useRef();
  const emailRef = useRef();

  const [username, setUsername] = useState(currentUser?.username || "");
  const [about, setAbout] = useState(currentUser?.about || "Hi there!");
  const [email, setEmail] = useState(currentUser?.email || "");

  const [isUsernameEditMode, setIsUsernameEditMode] = useState(false);
  const [isAboutEditMode, setIsAboutEditMode] = useState(false);
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);

  const handleUpdate = (e) => {
    switch (e.target.id) {
      case "username":
        console.log(username);
        setIsUsernameEditMode(false);
        break;
      case "about":
        console.log(about);
        setIsAboutEditMode(false);
        break;
      case "email":
        console.log(email);
        setIsEmailEditMode(false);
        break;
      default:
        console.log("default");
    }
  };

  const userDetails = [
    {
      id: "username",
      label: "Username",
      icon: FaRegUser,
      iconSize: "1rem",
      value: username,
      inputRef: usernameRef,
      isEditMode: isUsernameEditMode,
      handleChange: (e) => setUsername(e.target.value),
      handleUpdate: handleUpdate,
      handleEditMode: () => {
        usernameRef.current.focus();
        setIsUsernameEditMode((prev) => !prev);
      },
    },
    {
      id: "about",
      label: "About",
      icon: RiInformationLine,
      iconSize: "1.1rem",
      value: about,
      inputRef: aboutRef,
      isEditMode: isAboutEditMode,
      handleChange: (e) => setAbout(e.target.value),
      handleUpdate: handleUpdate,
      handleEditMode: () => {
        aboutRef.current.focus();
        setIsAboutEditMode((prev) => !prev);
      },
    },
    {
      id: "email",
      label: "Email",
      icon: FaRegEnvelope,
      iconSize: "1rem",
      value: email,
      inputRef: emailRef,
      isEditMode: isEmailEditMode,
      handleChange: (e) => setEmail(e.target.value),
      handleUpdate: handleUpdate,
      handleEditMode: () => {
        emailRef.current.focus();
        setIsEmailEditMode((prev) => !prev);
      },
    },
  ];

  useEffect(() => {
    console.log("mounted");
    return () => {
      setIsUsernameEditMode(false);
      setIsEmailEditMode(false);
      setIsAboutEditMode(false);
    };
  }, []);

  return (
    <div
      className={`absolute top-0 z-10 flex h-full w-full flex-col items-center bg-white transition-all ${
        isOpen ? "left-0" : "-left-full"
      } `}
    >
      <header className="flex h-20 w-full items-center gap-5 bg-skin-primary px-4 text-lg text-white">
        <FaArrowLeft className="cursor-pointer" onClick={closeProfileSlider} />
        Profile
      </header>
      <div className="my-8">
        <div className="relative ">
          <img
            src={currentUser?.profilePhoto}
            className=" h-32 w-32 rounded-full"
            alt=""
          />
          <div className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-skin-primary">
            <RiCameraLine size="1.2rem" className="text-white" />
          </div>
        </div>
      </div>

      <ul className="w-full px-4">
        {userDetails.map((el) => (
          <li
            key={el.id}
            className="flex h-[74px] items-center gap-6 border-b border-solid border-zinc-100 last:border-none"
          >
            <el.icon size={el.iconSize} className={`text-zinc-400`} />
            <div className="flex-1">
              <h4 className="text-sm font-normal text-zinc-500">{el.label}</h4>
              <input
                ref={el.inputRef}
                id={el.id}
                onChange={el.handleChange}
                type="text"
                value={el.value}
                readOnly={!el.isEditMode}
                className={`w-full text-base outline-none ${
                  el.isEditMode &&
                  "border-b-[1.5px] border-solid border-zinc-300"
                }`}
              />
            </div>
            {el.isEditMode ? (
              <FaCheck
                id={el.id}
                onClick={el.handleUpdate}
                size="1.2rem"
                className="cursor-pointer text-skin-primary"
              />
            ) : (
              <RiPencilLine
                onClick={el.handleEditMode}
                size="1.2rem"
                className="cursor-pointer text-skin-primary"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
