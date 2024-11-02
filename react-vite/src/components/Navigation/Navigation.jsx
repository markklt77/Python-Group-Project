import { NavLink } from "react-router-dom";
import { FaSpotify } from "react-icons/fa6";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <div className="logo-container">
        <NavLink to="/">
          <FaSpotify className="logo"/>
        </NavLink>
      </div>
      <ProfileButton />
    </nav>
  );
}

export default Navigation;
