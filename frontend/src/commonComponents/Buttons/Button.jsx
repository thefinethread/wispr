const primaryStyles = `bg-skin-primary bg-opacity-80 transition-opacity hover:bg-opacity-100`;
const secondaryStyles = `outline outline-1 outline-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors`;

const Button = ({
  type = "button",
  version = "primary",
  className = "",
  children,
  disabled = false,
}) => {
  const disabledStyles = disabled
    ? `disabled:cursor-not-allowed  disabled:bg-opacity-40 disabled:hover:bg-opacity-40`
    : "";

  return (
    <button
      disabled={disabled}
      type={type}
      className={`flex h-10 w-full items-center justify-center gap-4 rounded-md px-6 text-sm text-zinc-50 ${
        version === "primary" ? primaryStyles : secondaryStyles
      } ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
