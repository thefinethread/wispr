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
  const errorStyles = error ? `outline-red-600 outline-2` : "";
  return (
    <input
      className={`w w-80 rounded-sm px-4 py-2 text-sm font-light outline outline-1 outline-zinc-200 ${errorStyles}`}
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
