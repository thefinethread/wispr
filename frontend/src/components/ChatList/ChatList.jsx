import Spinner from "../../commonComponents/Spinners/Spinner";
import { useGetConversationsQuery } from "../../features/conversations/conversationApiSlice";
import ChatCard from "../ChatCard/ChatCard";

const ChatList = () => {
  const {
    isLoading,
    data: chatList,
    isError,
    error,
  } = useGetConversationsQuery();

  return (
    <div
      className={`flex flex-1 flex-col overflow-y-auto px-2 ${
        isLoading ? "items-center justify-center" : "justify-start"
      }`}
    >
      {isLoading ? (
        <Spinner color="border-zinc-400" size="h-7 w-7" />
      ) : (
        chatList?.map((chat) => <ChatCard key={chat._id} {...chat} />)
      )}
      {isError && error?.data?.message}
    </div>
  );
};

export default ChatList;
