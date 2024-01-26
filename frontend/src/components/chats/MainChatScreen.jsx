import { useParams } from "react-router-dom";
import TopNavBar from "../MainChatScreen/TopNavBar";
import ConversationWindow from "../MainChatScreen/ConversationWindow";
import MessageInput from "../MainChatScreen/MessageInput";
import { useState } from "react";

const MainChatScreen = () => {
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);

  const { conversationId } = useParams();

  const openChatInfo = () => setIsChatInfoOpen((prev) => !prev);

  return (
    <section className="flex h-full w-full">
      {conversationId === "home" ? (
        <p>Click on any chat</p>
      ) : (
        <>
          <section className="flex h-full flex-1 flex-col">
            <TopNavBar openChatInfo={openChatInfo} />
            <ConversationWindow />
            <MessageInput />
          </section>
          <section
            className={`h-full ${
              isChatInfoOpen ? "w-80" : "w-0"
            } bg-purple-400 transition-all`}
          ></section>
        </>
      )}
    </section>
  );
};

export default MainChatScreen;
