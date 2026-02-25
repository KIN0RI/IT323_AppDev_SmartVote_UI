import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (email, _password, role) => {
    console.log("Logging in:", email, "as", role);
    localStorage.setItem("userRole", role);
    navigate("/FaceVerification");
  };

  return (
    <main className="sv-page sv-page-center">
      <section className="sv-login-card">
        <div className="sv-login-header">
          <img src={logo} alt="USTP Logo" className="sv-login-logo" style={{ width: 64, height: 64, objectFit: 'contain', display: 'block', margin: '0 auto' }} />
          <h1>USTP SmartVote</h1>
          <p>Sign in to access the voting system</p>
        </div>

        <LoginForm onLogin={handleLogin} />

        <p className="sv-login-footer">
          Don't have an account?{" "}
          <Link to="/register" className="sv-link">
            Register here
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;