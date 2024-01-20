const ChatIconsList = ({
  icons: Icons = [],
  iconSize = "1.1rem",
  iconColor = "text-skin-primary",
  className = "",
  bgHoverSize = "h-9 w-9",
  onClick,
}) => {
  return (
    <ul
      className={`flex items-center justify-between gap-0 ${iconColor} ${className}`}
    >
      {Icons.map((Icon) => (
        <li
          onClick={onClick}
          className={`flex cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-zinc-100 ${bgHoverSize}`}
        >
          <Icon size={iconSize} />
        </li>
      ))}
    </ul>
  );
};

export default ChatIconsList;
