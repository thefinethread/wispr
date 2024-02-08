import { useContext, useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaRegEnvelope,
  FaRegUser,
} from "react-icons/fa6";
import { RiCameraLine, RiInformationLine, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
// import socket from "../../config/socketConfig";
import { updateUserInfo } from "../../features/auth/authSlice";
import IconButton from "../../commonComponents/IconButton";
import SocketContext from "../../context/socketContext";

const UserProfile = ({ isOpen, closeProfileSlider }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const { socket } = useContext(SocketContext);

  const usernameRef = useRef();
  const aboutRef = useRef();
  const emailRef = useRef();

  const [username, setUsername] = useState(currentUser?.username || "");
  const [about, setAbout] = useState(currentUser?.about || "Hi there!");
  const [email, setEmail] = useState(currentUser?.email || "");

  const [isUsernameEditMode, setIsUsernameEditMode] = useState(false);
  const [isAboutEditMode, setIsAboutEditMode] = useState(false);
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);

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
      handleUpdate: () =>
        updateInput("username", username, setIsUsernameEditMode),
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
      handleUpdate: () => updateInput("about", about, setIsAboutEditMode),
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
      handleUpdate: () => updateInput("email", email, setIsEmailEditMode),
      handleEditMode: () => {
        emailRef.current.focus();
        setIsEmailEditMode((prev) => !prev);
      },
    },
  ];

  const updateInput = (fieldName, fieldValue, setIsEditMode) => {
    if (currentUser?.[fieldName] === fieldValue) {
      setIsEditMode(false);
      return;
    }

    socket.emit(
      "update-user-profile",
      { userId: currentUser?._id, fieldName, fieldValue },
      (data) => dispatch(updateUserInfo(data)),
    );

    setIsEditMode(false);
  };

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
      className={`absolute top-0 z-10 flex h-full w-full flex-col items-center bg-skin-primary transition-all ${
        isOpen ? "left-0" : "-left-full"
      } `}
    >
      <header className="bg-skin-accent flex h-20 w-full items-center gap-5 bg-opacity-85 px-4 text-lg">
        <IconButton
          icon={FaArrowLeft}
          onClick={closeProfileSlider}
          hoverBgColor="hover:bg-black/10"
        />
        Profile
      </header>
      <div className="my-8">
        <div className="relative ">
          <img
            src={currentUser?.profilePhoto}
            className=" h-32 w-32 rounded-full"
            alt=""
          />

          <div className="bg-skin-accent absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
            <RiCameraLine size="1.2rem" className="text-white" />
          </div>
        </div>
      </div>

      <ul className="w-full px-4">
        {userDetails.map((el) => (
          <li
            key={el.id}
            className="border-skin-primary flex h-[74px] items-center gap-6 border-b border-solid last:border-none"
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
                className={`w-full bg-transparent text-base outline-none ${
                  el.isEditMode &&
                  "border-skin-primary border-b-[1.5px] border-solid"
                }`}
              />
            </div>
            {el.isEditMode ? (
              <IconButton
                id={el.id}
                onClick={el.handleUpdate}
                icon={FaCheck}
                iconColor="text-skin-accent"
              />
            ) : (
              <IconButton
                onClick={el.handleEditMode}
                icon={RiPencilLine}
                iconColor="text-skin-accent"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
