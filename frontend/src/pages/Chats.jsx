import { useEffect } from "react";
import MainChatScreen from "../components/chats/MainChatScreen";
import SideNavigation from "../components/chats/SideNavigation";
import socket from "../config/socketConfig";
import { newMessage } from "../features/messages/messageSlice";
import { useDispatch } from "react-redux";
import {
  startTyping,
  stopTyping,
} from "../features/conversations/conversationSlice";

const Chats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.connect(); // manually connecting to socket once authenticated

    socket.on("connect", () => {
      console.log("connected - ", socket.id);
      socket.emit("add-user");
    });

    socket.on("connect_error", (err) => {
      console.log(err.message); // prints the message associated with the error
    });

    socket.on("receive-message", (data) => dispatch(newMessage(data)));
    socket.on("my-message", (data) => dispatch(newMessage(data)));

    socket.on("start-typing", ({ senderId, text }) =>
      dispatch(startTyping({ senderId, text })),
    );
    socket.on("stop-typing", ({ senderId }) => dispatch(stopTyping(senderId)));

    return () => {
      socket.disconnect(); // disconnect socket once user leaves the component
    };
  }, [socket]);

  return (
    <main className="flex h-screen w-full text-sm font-normal">
      <SideNavigation />
      <MainChatScreen />
    </main>
  );
};

export default Chats;
