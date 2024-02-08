import { FaVideo, FaPhone, FaEllipsis } from "react-icons/fa6";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";
import { useGetConversationQuery } from "../../features/conversations/conversationApiSlice";
import NoProfilePic from "../../assets/images/no-profile-photo.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import ImageWithOnlineIcon from "../../commonComponents/ImageWithOnlineIcon";
import IconButton from "../../commonComponents/IconButton";

const ChatHeader = ({ openChatInfo }) => {
  const { typing } = useSelector((state) => state.conversationReducer);

  const { currentConversation } = useSelector((state) => state.app);

  // const checkTyping = useMemo(
  //   () => typing.find((el) => el?.senderId === receiver?._id),
  //   [typing, receiver?._id],
  // );

  return (
    <div className="border-skin-primary flex h-14 w-full items-center justify-between border-b border-solid pl-1 pr-2">
      <div className="hover:bg-skin-secondary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors">
        <ImageWithOnlineIcon
          imgSize="h-10 w-10"
          imgSrc={currentConversation?.otherUser?.profilePic}
          isOnline={currentConversation?.otherUser?.online}
        />
        <div className="flex flex-col justify-center font-normal text-skin-base">
          <span className="text-base leading-tight">
            {currentConversation?.otherUser?.username}
          </span>
          {true && (
            <span className="text-[13px] font-normal text-zinc-400">
              {true?.text}
            </span>
          )}
        </div>
      </div>
      <ul className="flex items-center gap-2">
        <IconButton icon={FaPhone} />
        <IconButton icon={FaVideo} iconSize="1.2rem" />
        <IconButton icon={FaEllipsis} onClick={openChatInfo} />
      </ul>
    </div>
  );
};

export default ChatHeader;
