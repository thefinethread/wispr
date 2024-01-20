import { FaVideo, FaPhone, FaEllipsis } from "react-icons/fa6";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import ChatIconsList from "../../commonComponents/ChatIconsList/ChatIconsList";

const icons = [FaPhone, FaVideo, FaEllipsis];

const TopNavBar = ({ chatInfo, openChatInfo }) => {
  return (
    <div className="flex h-14 w-full items-center justify-between bg-white pl-1 pr-2 shadow">
      <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-zinc-100">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={chatInfo.profilePic}
          alt=""
        />
        <div className="text-base font-normal">{chatInfo.name}</div>
      </div>
      <ul className="flex items-center gap-2">
        <ChatIconStyled icon={FaPhone} />
        <ChatIconStyled icon={FaVideo} iconSize="1.2rem" />
        <ChatIconStyled icon={FaEllipsis} onClick={openChatInfo} />
      </ul>
    </div>
  );
};

export default TopNavBar;
