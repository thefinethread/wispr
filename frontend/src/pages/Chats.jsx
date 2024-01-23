import { useState } from "react";
import MainChatScreen from "../components/chats/MainChatScreen";
import SideNavigation from "../components/chats/SideNavigation";
import { useGetConversationsQuery } from "../features/conversations/conversationApiSlice";

const Chats = () => {
  const { isLoading, data, isError, error } = useGetConversationsQuery();

  return (
    <main className="flex h-screen w-full text-sm font-light">
      <SideNavigation />
      <MainChatScreen />
    </main>
  );
};

export default Chats;
