import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const dashboardPath = role === "admin" ? "/Dashboard" : "/StudentDashboard";

  return (
    <div className="sv-app">
      <main className="sv-notfound-page">
        <div className="sv-notfound-card">
          <div className="sv-notfound-emoji">🗳️</div>
          <h1 className="sv-notfound-title">404</h1>
          <h2 className="sv-notfound-subtitle">Page Not Found</h2>
          <p className="sv-notfound-desc">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="sv-notfound-actions">
            <button
              className="sv-btn sv-notfound-btn-primary"
              onClick={() => navigate(role ? dashboardPath : "/")}
            >
              {role ? "Go to Dashboard" : "Go to Login"}
            </button>
            <button
              className="sv-btn sv-notfound-btn-outline"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
