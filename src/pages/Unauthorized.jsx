import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const dashboardPath = role === "admin" ? "/Dashboard" : "/StudentDashboard";

  return (
    <div className="sv-app">
      <main className="sv-unauth-page">
        <div className="sv-unauth-card">
          <div className="sv-unauth-icon">🚫</div>
          <h1 className="sv-unauth-title">Access Denied</h1>
          <h2 className="sv-unauth-subtitle">401 — Unauthorized</h2>
          <p className="sv-unauth-desc">
            You don't have permission to view this page. This area is restricted to authorized users only.
          </p>
          <div className="sv-unauth-role-badge">
            Logged in as: <strong>{role === "admin" ? "Admin" : "Student"}</strong>
          </div>
          <div className="sv-unauth-actions">
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

export default Unauthorized;