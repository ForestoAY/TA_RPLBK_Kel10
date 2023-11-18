// import React from "react";
// import { FaTrophy } from "react-icons/fa";
// import { RiHomeFill, RiProfileFill } from "react-icons/ri";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
// import "./Footer.css";

// export default function Footer() {
//   return (
//     <footer>
//       <div className="footer">
//         <NavLink to="/teams">
//           <RiHomeFill />
//         </NavLink>
//         <NavLink to="/leaderboard">
//           <FaTrophy />
//         </NavLink>
//         <NavLink to="/profile">
//           <RiProfileFill />
//         </NavLink>
//         {isLoggedIn ? (
//           <NavLink to="/login">
//             <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//           </NavLink>
//         ) : (
//           <NavLink to="/login">
//             <FontAwesomeIcon icon={faSignInAlt} /> Login
//           </NavLink>
//         )}
//       </div>
//     </footer>
//   );
// }
