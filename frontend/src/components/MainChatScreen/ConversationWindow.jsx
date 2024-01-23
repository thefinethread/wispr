import { useParams } from "react-router-dom";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useGetMessagesQuery } from "../../features/messages/messagesApiSlice";
import Spinner from "../../commonComponents/Spinners/Spinner";

const ConversationWindow = ({ chatInfo }) => {
  const { conversationId } = useParams();

  const {
    isLoading,
    data: messages,
    isError,
    error,
  } = useGetMessagesQuery({ conversationId });
  return (
    <div className="w-full flex-1 items-end overflow-y-auto px-3">
      <ul className="flex h-full w-full flex-col">
        {isLoading ? (
          <Spinner color="border-zinc-400" size="h-7 w-7" className=" m-auto" />
        ) : (
          messages?.map((message) => (
            <ChatMessage {...message} chatInfo={chatInfo} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ConversationWindow;
