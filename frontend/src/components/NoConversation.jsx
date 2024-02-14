import ChatImg from "../assets/images/homescreen.png";

const NoConversation = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-skin-secondary">
      <img className=" max-w-96" src={ChatImg} alt="" />
      <p className="text-base font-normal">
        Click on a conversation to start messaging
      </p>
    </div>
  );
};

export default NoConversation;
