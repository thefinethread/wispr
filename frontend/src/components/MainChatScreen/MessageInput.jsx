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
import { useDispatch } from "react-redux";
import { newMessage } from "../../features/messages/messageSlice";

const typingStatus = {
  typing: true,
  currentTime: new Date().getTime(),
};

const MessageInput = () => {
  const [text, setText] = useState("");
  const { conversationId } = useParams();
  const dispatch = useDispatch();

  const { data: conversation } = useGetConversationQuery({ conversationId });

  let typing = false;
  let timeout = undefined;

  const timeoutFunction = () => {
    typing = false;
    socket.emit("stop-typing", {
      receiverEmail: conversation?.members?.[0]?.email,
      senderId: JSON.parse(localStorage.getItem("userInfo"))._id,
    });
  };

  const handleSendMessage = (e) => {
    if (!typing) {
      typing = true;

      socket.emit("typing", {
        receiverEmail: conversation?.members?.[0]?.email,
        senderId: JSON.parse(localStorage.getItem("userInfo"))._id,
        text: `${
          JSON.parse(localStorage.getItem("userInfo")).username
        } is typing...`,
      });

      timeout = setTimeout(timeoutFunction, 5000);
    } else {
      clearTimeout(timeout);
      setTimeout(timeoutFunction, 5000);
    }

    if (e.key === "Enter" && e.target.value.trim()) {
      const message = {
        conversationId,
        senderId: JSON.parse(localStorage.getItem("userInfo"))._id,
        receiverEmail: conversation?.members?.[0]?.email,
        text,
      };
      socket.emit("send-message", message);
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
          onChange={(e) => setText(e.target.value)}
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

export default MessageInput;
