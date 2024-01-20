import ChatMessage from "../ChatMessage/ChatMessage";

const conversations = [
  {
    senderId: "1234",
    receiverId: "abcd",
    text: "Hi, how are you?",
    time: "8 Jan 2024, 13:56",
  },
  {
    senderId: "abcd",
    receiverId: "1234",
    text: `I'm good, thanks! How about you?`,
    time: "8 Jan 2024, 14:02",
  },
  {
    senderId: "1234",
    receiverId: "abcd",
    text: "Doing well too. Any plans for the weekend?",
    time: "8 Jan 2024, 14:10",
  },
  {
    senderId: "abcd",
    receiverId: "1234",
    text: "Not sure yet. Maybe catch a movie. What about you?",
    time: "8 Jan 2024, 14:15",
  },
  {
    senderId: "1234",
    receiverId: "abcd",
    text: "Sounds like a plan. I might go for a hike. Have you been to the new cafe downtown? Sounds like a plan. I might go for a hike. Have you been to the new cafe downtown?",
    time: "8 Jan 2024, 14:22",
  },
  {
    senderId: "abcd",
    receiverId: "1234",
    text: `Yes, it's great! The coffee is amazing. Highly recommend it!`,
    time: "8 Jan 2024, 14:30",
  },
  {
    senderId: "1234",
    receiverId: "abcd",
    text: `Awesome! I'll check it out. Thanks for the recommendation.`,
    time: "8 Jan 2024, 14:35",
  },
  {
    senderId: "abcd",
    receiverId: "1234",
    text: `You're welcome! Let me know how you like it.`,
    time: "8 Jan 2024, 14:40",
  },
  {
    senderId: "1234",
    receiverId: "abcd",
    text: "Sure thing. Have a great day!",
    time: "8 Jan 2024, 14:45",
  },
  {
    senderId: "abcd",
    receiverId: "1234",
    text: "You too!",
    time: "8 Jan 2024, 14:50",
  },
];

const ConversationWindow = ({ chatInfo }) => {
  return (
    <div className="w-full flex-1 items-end overflow-y-auto px-3">
      <ul className="flex w-full flex-col">
        {conversations.map((conversation) => (
          <ChatMessage conversation={conversation} chatInfo={chatInfo} />
        ))}
      </ul>
    </div>
  );
};

export default ConversationWindow;
