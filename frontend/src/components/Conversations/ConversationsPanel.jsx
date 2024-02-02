import { useState } from "react";
import ConversationList from "./ConversationList";
import TopHeader from "./TopHeader";

const ConversationsPanel = () => {
  const [isProfileSliderOpen, setIsProfileSliderOpen] = useState(false);

  const openProfileSlider = () => {
    setIsProfileSliderOpen(true);
  };
  return (
    <section className="relative flex w-96 flex-col border-r border-solid border-zinc-300">
      <section
        className={`absolute ${
          isProfileSliderOpen ? "left-0" : "-left-full"
        } top-0 z-10 flex h-full w-full items-center justify-center bg-gray-500 transition-all`}
      ></section>

      <TopHeader openProfileSlider={openProfileSlider} />
      <ConversationList />
    </section>
  );
};

export default ConversationsPanel;
