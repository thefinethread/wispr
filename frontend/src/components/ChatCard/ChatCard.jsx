import { Link } from "react-router-dom";
import { RiPushpinFill } from "react-icons/ri";
import NoProfilePic from "../../assets/images/no-profile-pic.jpg";
import { useSelector } from "react-redux";

const ChatCard = ({ _id, members, lastMessage }) => {
  const { senderId, text } = useSelector(
    (state) => state.messageReducer.typing,
  );

  return (
    <Link to={`/chats/${_id}`}>
      <div className="hover flex h-[72px] w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-zinc-100">
        <div className="flex h-full flex-1 items-center  gap-2 overflow-hidden">
          <img
            className="aspect-square h-full rounded-full object-cover"
            src={members?.[0]?.profilePhoto || NoProfilePic}
            alt=""
          />
          <div className="flex flex-col justify-center gap-1 overflow-hidden">
            <div className="text-base font-normal leading-tight">
              {members?.[0]?.username}
            </div>
            <div className="flex overflow-hidden text-[13px] font-normal text-zinc-500">
              <p
                className={`min-w-0  flex-1 overflow-hidden text-ellipsis whitespace-nowrap ${
                  text ? "text-skin-primary" : ""
                }`}
              >
                {members?.[0]?._id === senderId && text
                  ? text
                  : lastMessage?.text || ""}
              </p>
              {/* <span>-{lastMessage?.createdAt?.slice(0, 2)}</span> */}
            </div>
          </div>
        </div>
        <ul className="flex h-1/3  items-center justify-between ">
          <li className="h-full px-1">
            <RiPushpinFill size="1.1rem" className="text-zinc-300" />
          </li>
          {/* <li className="h-full px-1">
            <img
              className="aspect-square h-full rounded-full object-cover"
              src={members?.[0]?.profilePhoto || NoProfilePic}
              alt=""
            />
          </li> */}
        </ul>
      </div>
    </Link>
  );
};

export default ChatCard;
