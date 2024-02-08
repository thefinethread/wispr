import { FaEllipsisVertical } from "react-icons/fa6";
import {
  RiMore2Fill,
  RiSearchLine,
  RiArrowLeftLine,
  RiChatNewLine,
} from "react-icons/ri";
import { Icon } from "@iconify/react";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import IconButton from "../../commonComponents/IconButton";

const TopHeader = ({ openProfileSlider, openAddNewChat }) => {
  return (
    <div className="px-[10px]">
      <nav className="flex h-14 items-center justify-between">
        <img
          onClick={openProfileSlider}
          className="h-10 w-10 cursor-pointer rounded-full"
          src={JSON.parse(localStorage.getItem("currentUser"))?.profilePhoto}
          alt=""
        />
        <ul className="flex">
          <IconButton
            onClick={openAddNewChat}
            icon={RiChatNewLine}
            // iconColor="text-zinc-800"
          />
          <IconButton icon={RiMore2Fill} />
        </ul>
      </nav>
      <div className="flex w-full justify-center py-2">
        <div className="relative w-full">
          {/* <RiArrowLeftLine
            size="1.1rem"
            className="absolute left-3 top-0 translate-y-[calc(16px_-_50%)] text-zinc-600"
          /> */}
          <RiSearchLine
            size="1.1rem"
            className="absolute left-3 top-0 translate-y-[calc(16px_-_50%)] text-skin-muted"
          />
          <input
            type="text"
            className="bg-skin-secondary h-8 w-full rounded-md pl-14 text-skin-base text-opacity-85 outline-none placeholder:text-skin-muted "
            placeholder="Search Wispr"
          />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
