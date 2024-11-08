import { Link } from "react-router-dom";
import img from "../assets/images/logo.svg";

const Logo = () => {
  return (
    <Link to='/'>
      <img src={img} alt="logo" className="max-w-full max-h-full" />
    </Link>
  );
};
export default Logo;
