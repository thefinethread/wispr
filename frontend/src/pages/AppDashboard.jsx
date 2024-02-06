import { useEffect } from "react";
import ChatScreen from "../components/ChatScreen/ChatScreen";
import ConversationsPanel from "../components/Conversations/ConversationsPanel";
import socket from "../config/socketConfig";
import { newMessage } from "../features/messages/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConversations,
  startTyping,
  stopTyping,
  updateConversationDetail,
  prependConversation,
  prependNewConversation,
} from "../features/conversations/conversationSlice";
import { updateOtherUserInCurrentConversation } from "../features/app/appSlice";

const AppDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { currentConversation } = useSelector((state) => state.app);

  useEffect(() => {
    socket.connect(); // manually connecting to socket once authenticated

    socket.on("connect", () => {
      console.log("connected - ", socket.id);
    });

    socket.on("active-status", (data) => {
      dispatch(updateConversationDetail(data));
      dispatch(updateOtherUserInCurrentConversation(data));
    });

    socket.emit("all-conversations", currentUser?._id, (data) => {
      // receiving conversations as acknowledgment
      console.log(data);
      dispatch(getAllConversations(data));
    });

    socket.on("connect_error", (err) => {
      console.log(err.message); // prints the message associated with the error
    });

    socket.on("receive-message", (data) => {
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

    socket.on("start-typing", ({ senderId, text }) =>
      dispatch(startTyping({ senderId, text })),
    );

    socket.on("stop-typing", ({ senderId }) => dispatch(stopTyping(senderId)));

    socket.on("other-user-profile-updated", (data) => {
      dispatch(updateConversationDetail(data));
      dispatch(updateOtherUserInCurrentConversation(data));
    });

    return () => {
      socket.disconnect(); // disconnect socket once user leaves the component
    };
  }, []);

  return (
    <main className="flex h-screen w-full text-sm font-normal">
      <ConversationsPanel />
      <ChatScreen />
    </main>
  );
};

export default AppDashboard;
