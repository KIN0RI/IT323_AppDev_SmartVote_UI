import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sv-navbar">
      <ul className="sv-nav-list">
        <li>
          <NavLink
            to="/StudentDashboard"
            className={({ isActive }) =>
              `sv-nav-item ${isActive ? "sv-nav-active" : ""}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vote"
            className={({ isActive }) =>
              `sv-nav-item ${isActive ? "sv-nav-active" : ""}`
            }
          >
            Vote
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
