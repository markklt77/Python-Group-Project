import { NavLink } from "react-router-dom";
import { FaSpotify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SongFormModal from "../SongFormModal";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";

function Navigation() {
  // Add useSelector to get current User
  const user = useSelector(state => state.session.user)
  // Add conditional for Add Song button
  return (
    <nav>
      <div className="logo-container">
        <NavLink to="/">
          <FaSpotify className="logo"/>
        </NavLink>
      </div>
      <div className="profile-container">
        {user && <OpenModalButton
          modalComponent={<SongFormModal />}
          buttonText="Add Song"
          addClass='filter-buttons'
        />}
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
