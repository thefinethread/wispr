import ChatCard from "../ChatCard/ChatCard";

const chatList = [
  {
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
    name: "Test User",
    text: {
      msg: "Hello how are you!, it is been a while",
      date: "23 h",
    },
    chatId: "1",
  },
  {
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
    name: "Test User",
    text: {
      msg: "Hello how are you!, it is been a while",
      date: "23 h",
    },
    chatId: "2",
  },
  // {
  //   profilePic:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
  //   name: "Test User",
  //   text: {
  //     msg: "Hello how are you!, it is been a while",
  //     date: "23 h",
  //   },
  // },
  // {
  //   profilePic:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
  //   name: "Test User",
  //   text: {
  //     msg: "Hello how are you!, it is been a while",
  //     date: "23 h",
  //   },
  // },
  // {
  //   profilePic:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
  //   name: "Test User",
  //   text: {
  //     msg: "Hello how are you!, it is been a while",
  //     date: "23 h",
  //   },
  // },
  // {
  //   profilePic:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
  //   name: "Test User",
  //   text: {
  //     msg: "Hello how are you!, it is been a while",
  //     date: "23 h",
  //   },
  // },
  // {
  //   profilePic:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
  //   name: "Test User",
  //   text: {
  //     msg: "Hello how are you!, it is been a while",
  //     date: "23 h",
  //   },
  // },
  // {
  //   profilePic:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
  //   name: "Test User",
  //   text: {
  //     msg: "Hello how are you!, it is been a while",
  //     date: "23 h",
  //   },
  // },
  // {
  //   profilePic:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm2pEo-HS86uD-QYEWTD78wNkoUCZmU-BYw&usqp=CAU",
  //   name: "Test User",
  //   text: {
  //     msg: "Hello how are you!, it is been a while",
  //     date: "23 h",
  //   },
  // },
];

const ChatList = () => {
  return (
    <div className="flex-1 overflow-y-auto px-2">
      {chatList.map((chat) => (
        <ChatCard key={chat.name} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
