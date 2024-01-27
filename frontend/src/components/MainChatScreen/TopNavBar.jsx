import { FaVideo, FaPhone, FaEllipsis } from "react-icons/fa6";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import { useGetConversationQuery } from "../../features/conversations/conversationApiSlice";
import NoProfilePic from "../../assets/images/no-profile-pic.jpg";
import { useParams } from "react-router-dom";

const TopNavBar = ({ openChatInfo }) => {
  const { conversationId } = useParams();
  console.log(conversationId);
  const { isLoading, data: conversation } = useGetConversationQuery({
    conversationId,
  });

  return (
    <div className="flex h-14 w-full items-center justify-between bg-white pl-1 pr-2 shadow">
      <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-zinc-100">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={conversation?.members?.[0]?.profilePhoto || NoProfilePic}
          alt=""
        />
        <div className="flex flex-col justify-center text-base font-normal leading-none">
          <span>{conversation?.members?.[0]?.username}</span>
          <span className="text-sm font-light">typing...</span>
        </div>
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
