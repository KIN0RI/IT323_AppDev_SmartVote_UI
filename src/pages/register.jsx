import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const navigate  = useNavigate();
  const [form, setForm]       = useState({ full_name: "", student_id: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register/", form);
      setSubmitted(true);
    } catch (err) {
      const data = err.response?.data;
      if (data) {
        const messages = Object.values(data).flat().join(" ");
        setError(messages);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="sv-page sv-page-center">
      <section className="sv-login-card">
        <div className="sv-login-header">
          <span className="sv-login-icon">📋</span>
          <h1>Voter Registration</h1>
          <p>Register to participate in the student election</p>
        </div>

        {submitted ? (
          <section className="sv-vote-success">
            <span className="sv-vote-success-icon">🎉</span>
            <h2>Registration Complete!</h2>
            <p>You can now log in to cast your vote.</p>
            <button
              className="sv-btn sv-btn-primary"
              onClick={() => navigate("/")}
              style={{ marginTop: "20px" }}
            >
              Back to Login
            </button>
          </section>
        ) : (
          <form className="sv-form" onSubmit={handleSubmit}>
            {error && (
              <p style={{ color: "#dc2626", marginBottom: "12px", fontWeight: 500 }}>{error}</p>
            )}
            <div className="sv-form-group">
              <label htmlFor="full_name">Full Name</label>
              <input
                id="full_name" name="full_name" type="text"
                value={form.full_name} onChange={handleChange}
                placeholder="Juan Dela Cruz" required
              />
            </div>
            <div className="sv-form-group">
              <label htmlFor="student_id">Student ID</label>
              <input
                id="student_id" name="student_id" type="text"
                value={form.student_id} onChange={handleChange}
                placeholder="2024-00123" required
              />
            </div>
            <div className="sv-form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email" name="email" type="email"
                value={form.email} onChange={handleChange}
                placeholder="student@gmail.com" required
              />
            </div>
            <div className="sv-form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password" name="password" type="password"
                value={form.password} onChange={handleChange}
                placeholder="Create a password (min 6 chars)" required
              />
            </div>
            <button type="submit" className="sv-btn sv-btn-primary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="sv-login-footer">
              Already have an account?{" "}
              <span className="sv-link" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                Sign in here
              </span>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}

export default Register;
