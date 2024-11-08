import Logo from "./Logo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="header">
      <Logo />
      <div className="header-list ">
        <Link to="#" className="header-list_item">
          Home
        </Link>
        <Link to="#" className="header-list_item">
          Anime
        </Link>
        <Link to="#" className="header-list_item">
          TOP 100
        </Link>
        <Link to="#" className="header-list_item">
          Random
        </Link>
        <Link to="#" className="header-list_item">
          Community
        </Link>
      </div>
      <div className="header-auth">
        <Link to="auth/sign-in" className="btn ">
          Sign-In
        </Link>
        <Link to="auth/sign-up" className="btn !bg-green-default">
          Sign-Up
        </Link>
      </div>
    </section>
  );
};
export default Header;
