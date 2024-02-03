import { useState } from "react";
import ConversationList from "./ConversationList";
import TopHeader from "./TopHeader";
import UserProfile from "../UserProfile/UserProfile";

const ConversationsPanel = () => {
  const [isProfileSliderOpen, setIsProfileSliderOpen] = useState(false);

  const openProfileSlider = () => setIsProfileSliderOpen(true);

  const closeProfileSlider = () => setIsProfileSliderOpen(false);

  return (
    <section className="relative flex w-[400px] flex-col border-r border-solid border-zinc-300">
      {isProfileSliderOpen && (
        <UserProfile
          isOpen={isProfileSliderOpen}
          closeProfileSlider={closeProfileSlider}
        />
      )}
      <TopHeader openProfileSlider={openProfileSlider} />
      <ConversationList />
    </section>
  );
};

export default ConversationsPanel;
