import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(() => localStorage.getItem("userRole") || "student");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleStorage = () => setRole(localStorage.getItem("userRole") || "student");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dashboardPath = role === "admin" ? "/dashboard" : "/StudentDashboard";
  const roleLabel = role === "admin" ? "Admin" : "Student";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="sv-topbar">
      <div className="sv-topbar-inner">
        <Link to="/" className="sv-logo-link">
          <img src={logo} alt="USTP Logo" className="sv-logo-img" />
          <span className="sv-logo-text">USTP SmartVote</span>
        </Link>

        <nav className="sv-topbar-nav">
          <ul className="sv-topbar-nav-list">
            <li>
              <NavLink
                to={dashboardPath}
                className={({ isActive }) =>
                  `sv-topbar-link ${isActive ? "sv-topbar-link-active" : ""}`
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
                    `sv-topbar-link ${isActive ? "sv-topbar-link-active" : ""}`
                  }
                >
                  Vote
                </NavLink>
              </li>
            )}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/VoterLog"
                  className={({ isActive }) =>
                    `sv-topbar-link ${isActive ? "sv-topbar-link-active" : ""}`
                  }
                >
                  Voter Log
                </NavLink>
              </li>
            )}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/ManageCandidates"
                  className={({ isActive }) =>
                    `sv-topbar-link ${isActive ? "sv-topbar-link-active" : ""}`
                  }
                >
                  Candidates
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/results"
                className={({ isActive }) =>
                  `sv-topbar-link ${isActive ? "sv-topbar-link-active" : ""}`
                }
              >
                Results
              </NavLink>
            </li>
            {role === "student" && (
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `sv-topbar-link ${isActive ? "sv-topbar-link-active" : ""}`
                  }
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="sv-profile-dropdown" ref={dropdownRef}>
          <button
            className="sv-profile-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span className="sv-profile-avatar">👤</span>
            <span className="sv-profile-role">{roleLabel}</span>
            <span className={`sv-profile-chevron ${dropdownOpen ? "sv-chevron-open" : ""}`}>▾</span>
          </button>

          {dropdownOpen && (
            <ul className="sv-profile-menu">
              {role === "student" && (
                <li>
                  <Link to="/profile" className="sv-profile-menu-item" onClick={() => setDropdownOpen(false)}>
                    My Profile
                  </Link>
                </li>
              )}
              <li>
                <button className="sv-profile-menu-item sv-profile-menu-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;