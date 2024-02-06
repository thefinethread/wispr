import {
  FaFaceSmile,
  FaImage,
  FaMicrophone,
  FaNoteSticky,
} from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { RiSendPlaneFill, RiFileGifFill } from "react-icons/ri";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import { useEffect, useState } from "react";
import { useSendMessageMutation } from "../../features/messages/messagesApiSlice";
import { useParams } from "react-router-dom";
import socket from "../../config/socketConfig";
import { useGetConversationQuery } from "../../features/conversations/conversationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { newMessage } from "../../features/messages/messageSlice";
import {
  prependConversation,
  prependNewConversation,
} from "../../features/conversations/conversationSlice";

const typingStatus = {
  typing: true,
  currentTime: new Date().getTime(),
};

const ChatFooter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const { currentConversation } = useSelector((state) => state.app);

  let typing = false;
  let timeout = undefined;

  const timeoutFunction = () => {
    typing = false;
    socket.emit("stop-typing", {
      senderId: currentConversation?.currentUser?._id,
      receiverId: currentConversation?.otherUser?._id,
    });
  };

  const handleInputChange = (e) => {
    setText(e.target.value);

    if (!typing) {
      typing = true;

      socket.emit("typing", {
        senderId: currentConversation?.currentUser?._id,
        receiverId: currentConversation?.otherUser?._id,
        text: "typing...",
      });

      timeout = setTimeout(timeoutFunction, 2000);
    } else {
      clearTimeout(timeout);
      setTimeout(timeoutFunction, 2000);
    }
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const message = {
        conversationId: currentConversation?._id,
        senderId: currentConversation?.currentUser?._id,
        receiverId: currentConversation?.otherUser?._id,
        text,
      };

      clearTimeout(timeout);
      timeoutFunction();

      socket.emit("send-message", message, (data) => {
        dispatch(newMessage(data));

        if (data?.newChat) {
          dispatch(
            prependNewConversation({
              message: data?.message,
              otherUser: currentConversation?.otherUser,
            }),
          );
        } else {
          dispatch(prependConversation(data));
        }
      });
      setText("");
    }
  };

  return (
    <section className="flex h-16 w-full items-center justify-between gap-2 px-3">
      <ul className="flex items-center gap-1">
        <ChatIconStyled icon={FaImage} />
        <ChatIconStyled icon={FaNoteSticky} />
        <ChatIconStyled icon={RiFileGifFill} iconSize="1.2rem" />
      </ul>
      <div className="relative flex-1">
        <input
          onKeyDown={handleSendMessage}
          onChange={handleInputChange}
          value={text}
          type="text"
          placeholder="Aa"
          className="h-full w-full rounded-full bg-zinc-100 px-4 py-2 outline-none placeholder:text-zinc-600"
        />
        <ChatIconStyled icon={FaFaceSmile} className="absolute right-0 top-0" />
      </div>
      <ChatIconStyled icon={FaMicrophone} />
      <ChatIconStyled
        icon={RiSendPlaneFill}
        className=" rotate-45"
        iconSize="1.2rem"
      />
    </section>
  );
};

export default ChatFooter;
