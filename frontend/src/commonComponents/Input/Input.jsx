const Input = ({ type = "text", placeholder = "" }) => {
  return (
    <input
      className="w-72 rounded-sm px-4 py-2 text-sm font-light outline outline-1 outline-zinc-200"
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
