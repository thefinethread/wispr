import UnderlineLink from "../../commonComponents/styledComponents/UnderlineLink";
import Logo from "../../assets/images/logo.png";

const Navbar = ({ navItem }) => {
  return (
    <div className="flex w-full items-center justify-between py-4">
      <div className="flex items-center justify-center gap-2">
        <img className="h-10 w-10 " src={Logo} alt="wispr" />
        <h2 className="font-comfortaa text-xl font-bold">Wispr</h2>
      </div>
      <nav>
        <UnderlineLink to={navItem?.path}>{navItem?.label}</UnderlineLink>
      </nav>
    </div>
  );
};

export default Navbar;
