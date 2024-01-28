import { FaVideo, FaPhone, FaEllipsis } from "react-icons/fa6";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import { useGetConversationQuery } from "../../features/conversations/conversationApiSlice";
import NoProfilePic from "../../assets/images/no-profile-pic.jpg";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const TopNavBar = ({ openChatInfo }) => {
  const { conversationId } = useParams();
  const { typing } = useSelector((state) => state.conversationReducer);
  const { data: conversation } = useGetConversationQuery({ conversationId });

  const receiver = conversation?.members?.[0];

  const checkTyping = useMemo(
    () => typing.find((el) => el?.senderId === receiver?._id),
    [typing, receiver?._id],
  );

  return (
    <div className="flex h-14 w-full items-center justify-between bg-white pl-1 pr-2 shadow">
      <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-zinc-100">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={receiver?.profilePhoto || NoProfilePic}
          alt=""
        />
        <div className="flex flex-col justify-center font-normal">
          <span className="text-base leading-tight">{receiver?.username}</span>
          {checkTyping && (
            <span className="text-[13px] font-normal text-zinc-400">
              {checkTyping?.text}
            </span>
          )}
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
