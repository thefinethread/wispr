const ErrorMessage = ({ children }) => {
  return (
    <div className="w-full rounded-md border-[1.5px] border-solid border-red-300 bg-orange-500/5 px-3 py-2">
      <p className="text-xs  font-medium text-red-700">{children}</p>
    </div>
  );
};

export default ErrorMessage;
