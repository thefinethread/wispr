const IconButton = ({
  id = "",
  icon: Icon,
  onClick,
  size = "1.2rem",
  iconColor = "text-skin-primary",
  hoverBgColor = "hover:bg-skin-secondary",
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${hoverBgColor} ${iconColor}`}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;
