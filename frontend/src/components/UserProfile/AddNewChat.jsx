import { FaArrowLeft } from "react-icons/fa6";
import IconButton from "../../commonComponents/IconButton";
import { RiSearchLine } from "react-icons/ri";
import UserImg from "../../assets/images/user.jpg";

const results = [
  {
    _id: "1",
    username: "john",
    profilePhoto: UserImg,
  },
  {
    _id: "2",
    username: "john",
    profilePhoto: UserImg,
  },
  {
    _id: "3",
    username: "john",
    profilePhoto: UserImg,
  },
  {
    _id: "4",
    username: "john",
    profilePhoto: UserImg,
  },
];

const AddNewChat = ({ isOpen, closeAddNewChat }) => {
  return (
    <div className="absolute z-10 h-full w-full flex-col items-center bg-white">
      <header className="flex h-20 w-full items-center gap-5 bg-skin-primary px-4 text-lg text-white">
        <IconButton
          icon={FaArrowLeft}
          onClick={closeAddNewChat}
          hoverBgColor="hover:bg-black/10"
        />
        Add New Chat
      </header>
      <div className="my-5 flex w-full justify-center px-4">
        <div className="relative w-full">
          {/* <RiArrowLeftLine
            size="1.1rem"
            className="absolute left-3 top-0 translate-y-[calc(16px_-_50%)] text-zinc-600"
          /> */}
          <RiSearchLine
            size="1.1rem"
            className="absolute left-3 top-0 translate-y-[calc(16px_-_50%)] text-zinc-600"
          />
          <input
            autoFocus={true}
            type="text"
            className="h-8  w-full rounded-md bg-zinc-100 pl-14 outline-none placeholder:text-zinc-500"
            placeholder="Search username or email"
          />
        </div>
      </div>
      <div className="my-4 px-4">
        {results.map((user) => (
          <div
            key={user._id}
            className="h-18 flex cursor-pointer items-center gap-6 rounded-md border-b border-solid border-zinc-200 py-3 transition-colors last:border-0 hover:bg-zinc-100"
          >
            <img
              className="h-11 w-11 rounded-full object-cover"
              src={user.profilePhoto}
              alt=""
            />
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNewChat;
