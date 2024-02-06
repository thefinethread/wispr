import ChatMessage from "./ChatMessage";
import Spinner from "../../commonComponents/Spinners/Spinner";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../features/messages/messageSlice";
import socket from "../../config/socketConfig";

const ChatMessagesList = () => {
  const [typing, setTyping] = useState("");

  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messageReducer);
  const { currentConversation } = useSelector((state) => state.app);
  const typingRef = useRef();

  useEffect(() => {
    console.log(currentConversation?._id);
    socket.emit(
      "get-messages",
      { conversationId: currentConversation?._id },
      (data) =>
        dispatch(
          getMessages({ data, conversationId: currentConversation?._id }),
        ),
    );
  }, [currentConversation?._id]);

  useEffect(() => {
    typingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typing]);

  return (
    <div className="w-full flex-1 items-end overflow-hidden px-3">
      <ul className="relative flex h-full w-full flex-col-reverse overflow-y-auto">
        {!messages ? (
          <Spinner color="border-zinc-400" size="h-7 w-7" className=" m-auto" />
        ) : (
          messages
            ?.toReversed()
            ?.map((message) => <ChatMessage key={message._id} {...message} />)
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

export default ChatMessagesList;
