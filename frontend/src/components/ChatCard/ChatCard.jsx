import { Link } from "react-router-dom";
import { RiPushpinFill } from "react-icons/ri";

const ChatCard = ({ chat }) => {
  return (
    <Link to={`/chats/${chat?.chatId}`}>
      <div className="hover flex h-[72px] w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-zinc-100">
        <div className="flex h-full flex-1 items-center justify-between gap-2 overflow-hidden">
          <img
            className="aspect-square h-full rounded-full object-cover"
            src={chat.profilePic}
            alt=""
          />
          <div className="flex flex-col justify-center gap-1 overflow-hidden">
            <div className="font-normal">{chat.name}</div>
            <div className="flex overflow-hidden text-xs font-normal text-zinc-500">
              <p className="min-w-0  flex-1 overflow-hidden text-ellipsis whitespace-nowrap ">
                You: {chat.text.msg}
              </p>{" "}
              <span>-{chat.text.date}</span>
            </div>
          </div>
        </div>
        <ul className="flex h-1/3  items-center justify-between ">
          <li className="h-full px-1">
            <RiPushpinFill size="1.1rem" className="text-zinc-300" />
          </li>
          <li className="h-full px-1">
            <img
              className="aspect-square h-full rounded-full object-cover"
              src={chat.profilePic}
              alt=""
            />
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default ChatCard;
