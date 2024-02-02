import { FaEllipsisVertical } from "react-icons/fa6";
import { RiMore2Fill, RiSearchLine, RiArrowLeftLine } from "react-icons/ri";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";

const TopHeader = ({ openProfileSlider }) => {
  return (
    <div className="px-[10px]">
      <nav className="flex h-14 items-center justify-between">
        <img
          onClick={openProfileSlider}
          className="h-10 w-10 cursor-pointer rounded-full"
          src={JSON.parse(localStorage.getItem("currentUser"))?.profilePhoto}
          alt=""
        />
        <ul>
          <ChatIconStyled
            icon={FaEllipsisVertical}
            iconSize="1.2rem"
            className="translate-x-3"
            color="text-zinc-700"
          />
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
            className="absolute left-3 top-0 translate-y-[calc(16px_-_50%)] text-zinc-600"
          />
          <input
            type="text"
            className="h-8 w-full rounded-md bg-zinc-100 pl-14 outline-none placeholder:text-zinc-500 focus:placeholder:opacity-0"
            placeholder="Search Wispr"
          />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
