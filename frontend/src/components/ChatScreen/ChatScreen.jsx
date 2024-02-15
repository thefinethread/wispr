import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessagesList";
import ChatFooter from "./ChatFooter";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoConversation from "../NoConversation";
import SocketContext from "../../context/socketContext";
import { updateConversationDetail } from "../../features/conversations/conversationSlice";

const ChatScreen = () => {
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);

  const { socket } = useContext(SocketContext);

  const { currentConversation } = useSelector((state) => state.app);

  const openChatInfo = () => setIsChatInfoOpen((prev) => !prev);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentConversation && socket) {
      const payload = {
        conversationId: currentConversation?._id,
        currentUserId: currentConversation?.currentUser?._id,
        otherUserId: currentConversation?.otherUser?._id,
      };

      socket.emit("update-last-viewed", payload, (data) => {
        console.log(data);
        dispatch(
          updateConversationDetail({
            _id: currentConversation?.otherUser?._id,
            unreadMessageCount: 0,
          }),
        );
      });
    }
  }, [currentConversation]);

  return (
    <section className="flex h-full flex-1 text-skin-accent text-opacity-85">
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
