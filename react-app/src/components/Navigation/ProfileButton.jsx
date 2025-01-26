import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate} from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import SongFormModal from "../SongFormModal";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="profile-button"
      >
        <FaUserCircle id="profile" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <div className="profile-button-container">
                <li>
                  <NavLink to="/manage-songs">
                    <button className="filter-buttons">
                      Manage Songs
                    </button>
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="filter-buttons"
                  >Log Out</button>
                </li>
              </div>
            </>
          ) : (
            <>
              <div className="session-buttons">
                <li>
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                    newClass="filter-buttons"
                  />
                </li>
                <li>
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                    newClass="filter-buttons"
                  />
                </li>
              </div>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
