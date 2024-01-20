import MainChatScreen from "../components/chats/MainChatScreen";
import SideNavigation from "../components/chats/SideNavigation";

const Chats = () => {
  return (
    <main className="flex h-screen w-full text-sm font-light">
      <SideNavigation />
      <MainChatScreen />
    </main>
  );
};

export default Chats;
