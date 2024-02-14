const ButtonStyled = ({ className = "", children, onClick, id = "" }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`after:bg-skin-accent relative cursor-pointer text-sm after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:transition-transform after:duration-[0.6s] after:content-[''] hover:after:origin-left hover:after:scale-x-100 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonStyled;
