import { useEffect, useRef, useState } from "react";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import { FaEllipsisVertical, FaRegFaceSmile } from "react-icons/fa6";
import NoProfilePic from "../../assets/images/no-profile-pic.jpg";
import socket from "../../config/socketConfig";
import { useDispatch, useSelector } from "react-redux";
import { newMessage } from "../../features/messages/messageSlice";

const userId = JSON.parse(localStorage.getItem("userInfo"))?._id || "";

const isMyText = (sender) => userId === sender;

const ChatMessage = ({ text, sender, createdAt, member }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.messageReducer.messages);

  const chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <li
      ref={chatRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`my-1 flex items-center justify-end gap-2 ${
        isMyText(sender) ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {isHovered && (
        <ul
          className={`flex items-center${
            isMyText(sender) ? "flex-row-reverse" : ""
          }`}
        >
          <ChatIconStyled
            icon={FaRegFaceSmile}
            color="text-zinc-400"
            bgHoverSize="h-6 w-6"
            iconSize="1rem"
          />
          <ChatIconStyled
            icon={FaEllipsisVertical}
            color="text-zinc-400"
            bgHoverSize="h-6 w-6"
            iconSize="1rem"
          />
        </ul>
      )}

      <p
        className={`max-w-[50%] rounded-[18px] px-3 py-2 ${
          isMyText(sender) ? "bg-skin-primary text-white" : "bg-zinc-100"
        }`}
      >
        {text}
      </p>
      {!isMyText(sender) && (
        <img
          className="h-7 w-7 self-end rounded-full object-cover"
          src={member?.profilePhoto || NoProfilePic}
          alt=""
        />
      )}
    </li>
  );
};

export default ChatMessage;
