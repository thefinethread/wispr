import { useState } from "react";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import { FaEllipsisVertical, FaRegFaceSmile } from "react-icons/fa6";

const userId = "1234";

const isMyText = (conversation) => conversation.senderId === userId;

const ChatMessage = ({ conversation, chatInfo }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`my-1 flex items-center justify-end gap-2 ${
        isMyText(conversation) ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {isHovered && (
        <ul
          className={`flex items-center${
            isMyText(conversation) ? "flex-row-reverse" : ""
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
          isMyText(conversation) ? "bg-skin-primary text-white" : "bg-zinc-100"
        }`}
      >
        {conversation.text}
      </p>
      {!isMyText(conversation) && (
        <img
          className="h-7 w-7 self-end rounded-full object-cover"
          src={chatInfo.profilePic}
          alt=""
        />
      )}
    </li>
  );
};

export default ChatMessage;
