import { useParams } from "react-router-dom";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useGetMessagesQuery } from "../../features/messages/messagesApiSlice";
import Spinner from "../../commonComponents/Spinners/Spinner";
import { useGetConversationQuery } from "../../features/conversations/conversationApiSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newMessage, getMessages } from "../../features/messages/messageSlice";
import socket from "../../config/socketConfig";

const ConversationWindow = () => {
  const [typing, setTyping] = useState("");
  const { conversationId } = useParams();
  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.messageReducer.messages);

  const { data: conversation } = useGetConversationQuery({ conversationId });

  const {
    isLoading,
    data: messages,
    isError,
    error,
  } = useGetMessagesQuery({ conversationId });

  const typingRef = useRef();

  useEffect(() => {
    socket.on("typing-response", (data) => setTyping(data));
    socket.on("stop-typing", () => setTyping(""));
  }, []);

  useEffect(() => {
    socket.on("receive-message", (data) => dispatch(newMessage(data)));
    socket.on("my-message", (data) => {
      dispatch(newMessage(data));
    });
  }, []);

  useEffect(() => {
    if (messages) {
      dispatch(getMessages(messages));
    }
  }, [messages]);

  useEffect(() => {
    typingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typing]);

  return (
    <div className="w-full flex-1 items-end overflow-y-auto px-3">
      <ul className="relative flex h-full w-full flex-col">
        {isLoading ? (
          <Spinner color="border-zinc-400" size="h-7 w-7" className=" m-auto" />
        ) : (
          messageList?.map((message) => (
            <ChatMessage
              key={message._id}
              {...message}
              member={conversation?.members?.[0]}
            />
          ))
        )}
        {typing && (
          <p ref={typingRef} className="italic text-skin-primary">
            {typing}
          </p>
        )}
      </ul>
    </div>
  );
};

export default ConversationWindow;
