import { useState } from "react";
import ConversationList from "./ConversationList";
import TopHeader from "./TopHeader";
import UserProfile from "../UserProfile/UserProfile";
import AddNewChat from "../UserProfile/AddNewChat";

const ConversationsPanel = () => {
  const [isProfileSliderOpen, setIsProfileSliderOpen] = useState(false);
  const [isAddNewChatOpen, setIsAddNewChatOpen] = useState(false);

  const openProfileSlider = () => setIsProfileSliderOpen(true);
  const closeProfileSlider = () => setIsProfileSliderOpen(false);

  const openAddNewChat = () => setIsAddNewChatOpen(true);
  const closeAddNewChat = () => setIsAddNewChatOpen(false);

  return (
    <section className="border-skin-primary relative flex w-[400px] flex-col border-r border-solid">
      {isProfileSliderOpen && (
        <UserProfile
          isOpen={isProfileSliderOpen}
          closeProfileSlider={closeProfileSlider}
        />
      )}
      {isAddNewChatOpen && (
        <AddNewChat
          isOpen={isAddNewChatOpen}
          closeAddNewChat={closeAddNewChat}
        />
      )}
      <TopHeader
        openProfileSlider={openProfileSlider}
        openAddNewChat={openAddNewChat}
      />
      <ConversationList />
    </section>
  );
};

export default ConversationsPanel;
