import { Link } from "react-router-dom";
import { RiPushpinFill } from "react-icons/ri";
import NoProfilePic from "../../assets/images/no-profile-photo.png";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { setCurrentConversation } from "../../features/app/appSlice";

const ChatCard = ({
  _id,
  otherUserId,
  otherUserName,
  otherUserProfilePic,
  lastMessage,
  lastMessageTime,
}) => {
  const dispatch = useDispatch();
  const { currentConversation } = useSelector((state) => state.app);
  const { currentUser } = useSelector((state) => state.auth);

  const handleCurrentConversation = () => {
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
        },
        lastMessage,
        lastMessageTime,
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
      className={`hover flex h-[72px] w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-zinc-100 ${
        currentConversation?._id === _id ? "bg-zinc-200" : ""
      }`}
    >
      <div className="flex h-full flex-1 items-center  gap-2 overflow-hidden">
        <img
          className="aspect-square h-full rounded-full object-cover"
          src={otherUserProfilePic || NoProfilePic}
          alt=""
        />
        <div className="flex flex-col justify-center gap-1 overflow-hidden">
          <div className="text-base font-normal leading-tight">
            {otherUserName}
          </div>
          <div className="flex overflow-hidden text-[13px] font-normal text-zinc-500">
            <p
              className={`min-w-0  flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}
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
            {/* <span>-{lastMessage?.createdAt?.slice(0, 2)}</span> */}
          </div>
        </div>
      </div>
      <ul className="flex h-1/3  items-center justify-between ">
        {/* <li className="h-full px-1">
            <RiPushpinFill size="1.1rem" className="text-zinc-300" />
          </li> */}
        {/* <li className="h-full px-1">
            <img
              className="aspect-square h-full rounded-full object-cover"
              src={members?.[0]?.profilePhoto || NoProfilePic}
              alt=""
            />
          </li> */}
      </ul>
    </div>
  );
};

export default ChatCard;
