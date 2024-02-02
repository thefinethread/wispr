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
  updateConversationList,
} from "../features/conversations/conversationSlice";

const AppDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    socket.connect(); // manually connecting to socket once authenticated

    socket.on("connect", () => {
      console.log("connected - ", socket.id);
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
      dispatch(updateConversationList(data));
    });

    socket.on("start-typing", ({ senderId, text }) =>
      dispatch(startTyping({ senderId, text })),
    );

    socket.on("stop-typing", ({ senderId }) => dispatch(stopTyping(senderId)));

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
