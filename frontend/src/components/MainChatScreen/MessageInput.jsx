import {
  FaFaceSmile,
  FaImage,
  FaMicrophone,
  FaNoteSticky,
} from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { RiSendPlaneFill, RiFileGifFill } from "react-icons/ri";
import ChatIconStyled from "../../commonComponents/styledComponents/MainChatScreen/ChatIconStyled";

const MessageInput = () => {
  return (
    <section className="flex h-16 w-full items-center justify-between gap-2 px-3">
      <ul className="flex items-center gap-1">
        <ChatIconStyled icon={FaImage} />
        <ChatIconStyled icon={FaNoteSticky} />
        <ChatIconStyled icon={RiFileGifFill} iconSize="1.2rem" />
      </ul>
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Aa"
          className="h-full w-full rounded-full bg-zinc-100 px-4 py-2 outline-none placeholder:text-zinc-600"
        />
        <ChatIconStyled icon={FaFaceSmile} className="absolute right-0 top-0" />
      </div>
      <ChatIconStyled icon={FaMicrophone} />
      <ChatIconStyled
        icon={RiSendPlaneFill}
        className=" rotate-45"
        iconSize="1.2rem"
      />
    </section>
  );
};

export default MessageInput;
