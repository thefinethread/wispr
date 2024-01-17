const Input = ({
  type = "text",
  placeholder = "",
  name = "",
  value,
  required = false,
  onBlur,
  onChange,
  error = false,
}) => {
  const errorStyles = error
    ? `outline-red-500 outline-2`
    : "outline-1 outline-zinc-200";
  return (
    <input
      className={`w-80 rounded-sm px-4 py-2 text-sm font-light outline ${errorStyles}`}
      type={type}
      placeholder={placeholder}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Input;
