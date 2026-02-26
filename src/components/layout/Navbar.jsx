import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole") || "student";
  const dashboardPath = role === "admin" ? "/Dashboard" : "/StudentDashboard";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="sv-navbar">
      <div className="sv-navbar-inner">

        {/* Left - Brand with logo */}
        <div className="sv-navbar-brand">
          <img src={logo} alt="USTP Logo" className="sv-navbar-logo-img" />
          <span className="sv-navbar-title">USTP SmartVote</span>
        </div>

        {/* Center - Nav Links */}
        <nav>
          <ul className="sv-nav-list">
            <li>
              <NavLink
                to={dashboardPath}
                className={({ isActive }) =>
                  `sv-nav-item ${isActive ? "sv-nav-active" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            {role === "student" && (
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
            )}
          </ul>
        </nav>

        {/* Right - Profile Dropdown */}
        <div className="sv-profile">
          <button
            className="sv-profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="sv-avatar">
              {role === "admin" ? "AD" : "ST"}
            </div>
            <span className="sv-profile-name">
              {role === "admin" ? "Administrator" : "Student User"}
            </span>
            <span className="sv-profile-caret">{dropdownOpen ? "▲" : "▼"}</span>
          </button>

          {dropdownOpen && (
            <div className="sv-dropdown">
              <hr className="sv-dropdown-divider" />
              <button
                className="sv-dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                👤 My Profile
              </button>
              <button
                className="sv-dropdown-item sv-dropdown-logout"
                onClick={handleLogout}
              >
                🔑 Log Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;