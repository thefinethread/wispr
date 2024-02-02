import { useParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessagesList";
import ChatFooter from "./ChatFooter";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatScreen = () => {
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);

  const { currentConversation } = useSelector((state) => state.app);

  const openChatInfo = () => setIsChatInfoOpen((prev) => !prev);

  return (
    <section className="flex h-full w-full">
      {currentConversation ? (
        <>
          <section className="flex h-full flex-1 flex-col">
            <ChatHeader openChatInfo={openChatInfo} />
            <ChatMessages />
            <ChatFooter />
          </section>
          <section
            className={`h-full ${
              isChatInfoOpen ? "w-80" : "w-0"
            } bg-purple-400 transition-all`}
          ></section>
        </>
      ) : (
        <p>Click on any chat</p>
      )}
    </section>
  );
};

export default ChatScreen;
