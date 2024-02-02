import Spinner from "../../commonComponents/Spinners/Spinner";
import ConversationCard from "./ConversationCard";
import { useSelector } from "react-redux";

const ConversationList = () => {
  const { conversations } = useSelector((state) => state.conversationReducer);

  return (
    <div
      className={`flex flex-1 flex-col overflow-y-auto px-2 ${
        !conversations ? "items-center justify-center" : "justify-start"
      }`}
    >
      {!conversations ? (
        <Spinner color="border-zinc-400" size="h-7 w-7" />
      ) : (
        conversations?.map((conversation) => (
          <ConversationCard key={conversation._id} {...conversation} />
        ))
      )}
    </div>
  );
};

export default ConversationList;
