const Button = ({
  type = "button",
  version = "primary",
  className = "",
  children,
}) => {
  const primaryStyles = `bg-skin-primary bg-opacity-70 transition-opacity hover:bg-opacity-100`;
  const secondaryStyles = `outline outline-1 outline-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors`;

  return (
    <button
      type={type}
      className={`flex w-full items-center justify-center gap-4 rounded-md px-6 py-2 text-sm text-zinc-50 ${
        version === "primary" ? primaryStyles : secondaryStyles
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
