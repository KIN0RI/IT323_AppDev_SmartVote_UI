import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import useProfile from "../hooks/useProfile";

function Profile() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole") || "student";
  const {
    profile,
    form,
    isEditing,
    saved,
    handleChange,
    handleSave,
    handleEdit,
    handleCancel,
  } = useProfile();

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-page">
        <div className="sv-page-container">

          <section className="sv-page-header">
            <h1>My Profile</h1>
            <p>View and update your student information</p>
          </section>

          <div className="sv-profile-card">
            <div className="sv-profile-hero">
              <div className="sv-profile-avatar-large">
                {profile.name.charAt(0)}
              </div>
              <h2>{profile.name}</h2>
              <span className="sv-candidate-position">
                {role === "admin" ? "Administrator" : "Student"}
              </span>
            </div>

            {saved && (
              <p style={{ textAlign: "center", color: "#16a34a", fontWeight: 600, marginBottom: "16px" }}>
                ✅ Profile updated successfully!
              </p>
            )}

            {isEditing ? (
              <form className="sv-form" onSubmit={handleSave}>
                <div className="sv-form-group">
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="sv-form-group">
                  <label>Student ID</label>
                  <input name="studentId" value={form.studentId} onChange={handleChange} required />
                </div>
                <div className="sv-form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="sv-form-group">
                  <label>Course</label>
                  <input name="course" value={form.course} onChange={handleChange} required />
                </div>
                <div className="sv-form-group">
                  <label>Year Level</label>
                  <input name="year" value={form.year} onChange={handleChange} required />
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" className="sv-btn sv-btn-primary">Save Changes</button>
                  <button type="button" className="sv-btn sv-btn-outline" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="sv-profile-details">
                <div className="sv-profile-row">
                  <span className="sv-profile-label">Full Name</span>
                  <span className="sv-profile-value">{profile.name}</span>
                </div>
                <div className="sv-profile-row">
                  <span className="sv-profile-label">Student ID</span>
                  <span className="sv-profile-value">{profile.studentId}</span>
                </div>
                <div className="sv-profile-row">
                  <span className="sv-profile-label">Email</span>
                  <span className="sv-profile-value">{profile.email}</span>
                </div>
                <div className="sv-profile-row">
                  <span className="sv-profile-label">Course</span>
                  <span className="sv-profile-value">{profile.course}</span>
                </div>
                <div className="sv-profile-row">
                  <span className="sv-profile-label">Year Level</span>
                  <span className="sv-profile-value">{profile.year}</span>
                </div>
                <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
                  <button className="sv-btn sv-btn-primary" onClick={handleEdit}>
                    Edit Profile
                  </button>
                  <button className="sv-btn sv-btn-outline" onClick={() => navigate(-1)}>
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;
