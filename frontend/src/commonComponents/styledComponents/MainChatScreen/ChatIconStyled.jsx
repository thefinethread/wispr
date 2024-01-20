const ChatIconStyled = ({
  icon: Icon,
  className = "",
  onClick,
  iconSize = "1.1rem",
  color = "text-skin-primary",
  bgHoverSize = "h-9 w-9",
}) => {
  return (
    <li
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-zinc-100 ${bgHoverSize} ${color} ${className}`}
    >
      <Icon size={iconSize} />
    </li>
  );
};

export default ChatIconStyled;
