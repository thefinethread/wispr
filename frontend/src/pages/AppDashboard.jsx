import { useContext, useEffect } from "react";
import ChatScreen from "../components/ChatScreen/ChatScreen";
import ConversationsPanel from "../components/Conversations/ConversationsPanel";
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
import SocketContext from "../context/socketContext";

const AppDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { currentConversation } = useSelector((state) => state.app);

  const { socket, initializeSocket, disconnectSocket } =
    useContext(SocketContext);

  useEffect(() => {
    if (!socket) initializeSocket();

    return () => disconnectSocket();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => console.log("connected - ", socket.id));

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
      console.log(data);
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
  }, [socket]);

  return (
    <main className="flex h-screen w-full bg-skin-primary text-sm font-normal text-skin-base text-opacity-85">
      <ConversationsPanel />
      <ChatScreen />
    </main>
  );
};

export default AppDashboard;
