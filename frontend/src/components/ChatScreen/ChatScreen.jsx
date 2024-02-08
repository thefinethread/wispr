import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessagesList";
import ChatFooter from "./ChatFooter";
import { useState } from "react";
import { useSelector } from "react-redux";
import NoConversation from "../NoConversation";

const ChatScreen = () => {
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);

  const { currentConversation } = useSelector((state) => state.app);

  const openChatInfo = () => setIsChatInfoOpen((prev) => !prev);

  return (
    <section className="text-skin-accent flex h-full flex-1 text-opacity-85">
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
        <NoConversation />
      )}
    </section>
  );
};

export default ChatScreen;
