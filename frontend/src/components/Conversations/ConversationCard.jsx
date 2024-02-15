import { Link } from "react-router-dom";
import { RiPushpinFill, RiAddLine, RiCheckDoubleFill } from "react-icons/ri";
import NoProfilePic from "../../assets/images/no-profile-photo.png";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { setCurrentConversation } from "../../features/app/appSlice";
import OnlineIcon from "../../commonComponents/ImageWithOnlineIcon";
import ImageWithOnlineIcon from "../../commonComponents/ImageWithOnlineIcon";
import { FaPlus } from "react-icons/fa6";

const ChatCard = ({
  _id,
  otherUserId,
  otherUserName,
  otherUserOnline,
  otherUserProfilePic,
  lastMessage,
  lastMessageTime,
  unreadMessageCount,
}) => {
  const dispatch = useDispatch();
  const { currentConversation } = useSelector((state) => state.app);
  const { currentUser } = useSelector((state) => state.auth);

  const handleCurrentConversation = () => {
    if (currentConversation?._id === _id) return;

    dispatch(
      setCurrentConversation({
        _id,
        currentUser: {
          _id: currentUser?._id,
          username: currentUser?.username,
          profilePic: currentUser?.profilePic,
        },
        otherUser: {
          _id: otherUserId,
          username: otherUserName,
          profilePic: otherUserProfilePic,
          online: otherUserOnline,
        },
      }),
    );
  };
  // const { typing } = useSelector((state) => state.conversationReducer);

  // const checkTyping = useMemo(
  //   () => typing.find((el) => el?.senderId === receiver?._id),
  //   [typing, receiver?._id],
  // );

  return (
    <div
      onClick={handleCurrentConversation}
      className={`hover  flex h-[72px] w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-skin-hover ${
        currentConversation?._id === _id ? "bg-skin-secondary" : ""
      }`}
    >
      <div className="flex h-full  items-center  gap-2 overflow-hidden">
        <ImageWithOnlineIcon
          imgSrc={otherUserProfilePic}
          isOnline={otherUserOnline}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1 overflow-hidden">
        <div className="text-base font-normal leading-tight">
          {otherUserName}
        </div>
        <div className="flex overflow-hidden text-[13px] font-normal text-skin-secondary">
          <p
            className={`min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-skin-muted`}
          >
            {lastMessage}
          </p>
          {/* <p
                className={`min-w-0  flex-1 overflow-hidden text-ellipsis whitespace-nowrap ${
                  checkTyping ? "text-skin-primary" : ""
                }`}
              >
                {checkTyping ? checkTyping?.text : `${lastMessage?.text}`}
              </p> */}
          {unreadMessageCount ? (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-skin-accent p-1 text-[11px] font-semibold text-skin-inverted">
              {unreadMessageCount > 5 ? (
                <>
                  {unreadMessageCount - 1}
                  <FaPlus size="10px" />
                </>
              ) : (
                unreadMessageCount
              )}
            </span>
          ) : null}
        </div>
      </div>

      {/* <ul className="flex h-1/3  items-center justify-between ">
        <li className="h-full px-1">
          <RiPushpinFill size="1.1rem" className="text-zinc-300" />
        </li>
        <li className="h-full px-1">
            <img
              className="aspect-square h-full rounded-full object-cover"
              src={members?.[0]?.profilePhoto || NoProfilePic}
              alt=""
            />
          </li>
      </ul> */}
    </div>
  );
};

export default ChatCard;
