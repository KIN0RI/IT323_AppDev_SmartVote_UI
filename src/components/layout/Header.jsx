import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="sv-app-header">
      <div className="sv-app-header-inner">
        <Link to="/" className="sv-logo-link">
          <img src={logo} alt="USTP Logo" className="sv-logo-img" />
          <span className="sv-logo-text">USTP SmartVote</span>
        </Link>
        <button className="sv-btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
