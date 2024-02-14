import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import IconButton from "../../commonComponents/IconButton";
import { RiSearchLine } from "react-icons/ri";
import UserImg from "../../assets/images/user.jpg";
import { useSearchUserMutation } from "../../features/user/usersApiSlice";
import Spinner from "../../commonComponents/Spinners/Spinner";
import { setCurrentConversation } from "../../features/app/appSlice";

const AddNewChat = ({ isOpen, closeAddNewChat }) => {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const [searchUser, { isLoading, data }] = useSearchUserMutation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleStartNewConversation = ({ _id, username, profilePhoto }) => {
    dispatch(
      setCurrentConversation({
        _id: null,
        currentUser: {
          _id: currentUser?._id,
          username: currentUser?.username,
          profilePic: currentUser?.profilePic,
        },
        otherUser: {
          _id,
          username,
          profilePic: profilePhoto,
        },
      }),
    );

    closeAddNewChat();
  };

  useEffect(() => {
    let timeoutId;

    if (query) {
      timeoutId = setTimeout(() => searchUser({ queryTerm: query }), 500);
    }

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => data && setUsers(data), [data]);

  useEffect(() => () => setQuery(""), []);

  return (
    <div className="absolute z-10 h-full w-full flex-col items-center bg-skin-primary">
      <header className="bg-skin-accent text-skin-inverted flex h-20 w-full items-center gap-5 bg-opacity-85 px-4 text-lg">
        <IconButton
          icon={FaArrowLeft}
          onClick={closeAddNewChat}
          hoverBgColor="hover:bg-black/10"
        />
        Add New Chat
      </header>
      <div className="my-5 flex w-full justify-center px-4">
        <div className="relative w-full">
          <RiSearchLine
            size="1.1rem"
            className="absolute left-3 top-0 translate-y-[calc(18px_-_50%)] text-zinc-600"
          />
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            autoFocus={true}
            type="text"
            className="bg-skin-secondary h-9 w-full rounded-md px-14 text-skin-base text-opacity-85 outline-none placeholder:text-skin-muted"
            placeholder="Search username or email"
          />
          {isLoading && <CustomSpinner />}
        </div>
      </div>

      <div className="my-4 px-4">
        {users
          ? users?.map((user) => (
              <UserCard
                onClick={() => handleStartNewConversation(user)}
                key={user?._id}
                {...user}
              />
            ))
          : query && (
              <p className="text-center text-zinc-400">
                No results found for '{query}'
              </p>
            )}
      </div>
    </div>
  );
};

const CustomSpinner = () => (
  <div className="absolute right-4 top-0 flex translate-y-[calc(18px_-_50%)] items-center justify-center">
    <Spinner size="h-6 w-6" color="border-zinc-500" />
  </div>
);

const UserCard = ({ _id, profilePhoto, username, onClick }) => (
  <div
    onClick={onClick}
    className="h-18 border-skin-primary hover:bg-skin-secondary flex cursor-pointer items-center gap-6 rounded-md border-b border-solid bg-skin-primary py-3 pl-2 transition-colors last:border-0"
  >
    <img
      className="h-11 w-11 rounded-full object-cover"
      src={profilePhoto || UserImg}
      alt=""
    />
    <p>{username}</p>
  </div>
);

export default AddNewChat;
