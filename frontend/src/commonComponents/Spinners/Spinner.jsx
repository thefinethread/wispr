const Spinner = ({ size, color = "border-zinc-50", className }) => {
  return (
    <div
      className={`min-h-6 min-w-6 animate-spin rounded-full border-2 border-solid border-s-transparent ${color} ${size} ${className}`}
    ></div>
  );
};

export default Spinner;
