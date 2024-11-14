import { NavLink } from "react-router-dom";
import { FaSpotify } from "react-icons/fa6";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SongFormModal from "../SongFormModal";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";

function Navigation() {
  // Add useSelector to get current User
  // Add conditional for Add Song button
  return (
    <nav>
      <div className="logo-container">
        <NavLink to="/">
          <FaSpotify className="logo"/>
        </NavLink>
      </div>
      <div>
        <OpenModalButton
          modalComponent={<SongFormModal />}
          buttonText="Add Song"
        />
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
