import { Link } from "react-router-dom";

const UnderlineLink = ({ children, to = "#", className = "" }) => {
  return (
    <Link
      to={to}
      className={`relative cursor-pointer after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-skin-primary after:transition-transform after:duration-[0.6s] after:content-[''] hover:after:origin-left hover:after:scale-x-100 ${className}`}
    >
      {children}
    </Link>
  );
};

export default UnderlineLink;
