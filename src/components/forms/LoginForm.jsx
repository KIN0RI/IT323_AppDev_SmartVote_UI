import { useState } from "react";
import api from "../../api";

function LoginForm({ onLogin }) {
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [role,         setRole]         = useState("student");
  const [error,        setError]        = useState("");
  const [isLoading,    setIsLoading]    = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    
    if (role === "student" && !email.endsWith("@gmail.com")) {
      setError("Students must use a Gmail address (@gmail.com).");
      return;
    }
    if (role === "admin" && !email.endsWith("@ustp.edu.ph")) {
      setError("Admins must use a USTP email address (@ustp.edu.ph).");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/auth/login-email/", { email, password });
      localStorage.setItem("access_token",  res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("userRole",      res.data.role);
      localStorage.setItem("full_name",     res.data.full_name);
      localStorage.setItem("student_id",    res.data.student_id);
      onLogin(email, password, res.data.role);
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="sv-form" onSubmit={handleSubmit}>
      {error && <p className="sv-form-error">{error}</p>}

      <div className="sv-form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@ustp.edu.ph"
          required disabled={isLoading}
        />
      </div>

      <div className="sv-form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required disabled={isLoading}
        />
        <label className="sv-checkbox-label">
          <input type="checkbox" checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)} />
          Show password
        </label>
      </div>

      <div className="sv-form-group">
        <label htmlFor="role">Login as</label>
        <select id="role" value={role}
          onChange={(e) => setRole(e.target.value)}
          className="sv-select" disabled={isLoading}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit" className="sv-btn sv-btn-primary" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
