import { useEffect, useRef, useState } from "react";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import { FaEllipsisVertical, FaRegFaceSmile } from "react-icons/fa6";
import NoProfilePic from "../../assets/images/no-profile-photo.png";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../commonComponents/IconButton";

const ChatMessage = ({ text, senderId, createdAt, updatedAt, _id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const chatRef = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { currentConversation } = useSelector((state) => state.app);
  const messageList = useSelector((state) => state.messageReducer.messages);

  const isMyText = () => currentUser?._id === senderId;

  // useEffect(() => {
  //   chatRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messageList]);

  return (
    <li
      ref={chatRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`my-1 flex items-center justify-end gap-2 ${
        isMyText(senderId) ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {isHovered && (
        <ul
          className={`flex items-center${
            isMyText(senderId) ? "flex-row-reverse" : ""
          }`}
        >
          <IconButton
            icon={FaRegFaceSmile}
            iconColor="text-skin-muted"
            bgHoverSize="h-6 w-6"
            size="1rem"
          />
          <IconButton
            icon={FaEllipsisVertical}
            iconColor="text-skin-muted"
            bgHoverSize="h-6 w-6"
            size="1rem"
          />
        </ul>
      )}

      <p
        className={`max-w-[50%] rounded-[18px] px-3 py-2 ${
          isMyText(senderId)
            ? "bg-skin-accent text-skin-base"
            : "bg-skin-secondary"
        }`}
      >
        {text}
      </p>
      {!isMyText(senderId) && (
        <img
          className="h-7 w-7 self-end rounded-full object-cover"
          src={currentConversation?.otherUser?.profilePic || NoProfilePic}
          alt=""
        />
      )}
    </li>
  );
};

export default ChatMessage;
