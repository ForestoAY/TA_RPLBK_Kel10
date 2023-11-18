// Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrophy } from "react-icons/fa";
import { RiHomeFill, RiProfileFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    onLogout();
    // Refresh the page after logout
    window.location.reload();
  };
  return (
    <nav className="navigation-container">
      <ul className="navigation-list">
        <li className="navigation-item">
          <NavLink to="/teams">
            <RiHomeFill /> Teams
          </NavLink>
        </li>
        <li className="navigation-item">
          <NavLink to="/leaderboard">
            <FaTrophy /> Leaderboard
          </NavLink>
        </li>
        <li className="navigation-item">
          <NavLink to="/profile">
            <RiProfileFill /> Profile
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li className="navigation-item" onClick={handleLogout}>
            <Link to="/login" className="navigation-link">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="navigation-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
