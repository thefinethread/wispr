import { useEffect } from "react";
import MainChatScreen from "../components/chats/MainChatScreen";
import SideNavigation from "../components/chats/SideNavigation";
import socket from "../config/socketConfig";

const Chats = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected - ", socket.id);
      socket.emit("add-user", {
        socketId: socket.id,
        email: JSON.parse(localStorage.getItem("userInfo")).email,
      });
    });
  }, []);

  return (
    <main className="flex h-screen w-full text-sm font-normal">
      <SideNavigation />
      <MainChatScreen />
    </main>
  );
};

export default Chats;
