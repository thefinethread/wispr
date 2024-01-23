import { useParams } from "react-router-dom";
import TopNavBar from "../MainChatScreen/TopNavBar";
import ConversationWindow from "../MainChatScreen/ConversationWindow";
import MessageInput from "../MainChatScreen/MessageInput";
import { useState } from "react";
import { useGetConversationsQuery } from "../../features/conversations/conversationApiSlice";
import { useGetMessagesQuery } from "../../features/messages/messagesApiSlice";

const chatInfo = {
  profilePic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
  name: "Test User",
  text: {
    msg: "Hello how are you!, it is been a while",
    date: "23 h",
  },
  chatId: "1",
};

const MainChatScreen = () => {
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);

  const openChatInfo = () => setIsChatInfoOpen((prev) => !prev);

  return (
    <section className="flex h-full w-full">
      <section className="flex h-full flex-1 flex-col">
        <TopNavBar chatInfo={chatInfo} openChatInfo={openChatInfo} />
        <ConversationWindow chatInfo={chatInfo} />
        <MessageInput />
      </section>
      <section
        className={`h-full ${
          isChatInfoOpen ? "w-80" : "w-0"
        } bg-purple-400 transition-all`}
      ></section>
    </section>
  );
};

export default MainChatScreen;
