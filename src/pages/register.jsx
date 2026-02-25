import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered:", form);
    setSubmitted(true);
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
            <div className="sv-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Juan Dela Cruz"
                required
              />
            </div>

            <div className="sv-form-group">
              <label htmlFor="studentId">Student ID</label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                value={form.studentId}
                onChange={handleChange}
                placeholder="2024-00123"
                required
              />
            </div>

            <div className="sv-form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="student@gmail.com"
                required
              />
            </div>

            <div className="sv-form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <button type="submit" className="sv-btn sv-btn-primary">
              Register
            </button>

            <p className="sv-login-footer">
              Already have an account?{" "}
              <span
                className="sv-link"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
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