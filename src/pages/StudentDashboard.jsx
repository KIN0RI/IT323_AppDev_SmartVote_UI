import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import api from "../api";
import "../styles/Dashboard.css";

const positions = ["President", "Vice President", "Secretary", "Treasurer", "Auditor"];

const announcements = [
  { id: 1, icon: "📢", text: "Voting ends today at 5:00 PM. Make sure to cast your vote!" },
  { id: 2, icon: "📋", text: "All registered students are eligible to vote in this election." },
  { id: 3, icon: "🔒", text: "Your vote is confidential and secured by the system." },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [electionStatus, setElectionStatus] = useState("Voting is Open");
  const [hasVoted, setHasVoted]             = useState(false);
  const fullName = localStorage.getItem("full_name") || "Student";

  useEffect(() => {
    // Get profile to check has_voted
    api.get("/auth/profile/")
      .then((res) => setHasVoted(res.data.has_voted))
      .catch(() => {});
    // Get election settings for status
    api.get("/election-settings/")
      .then((res) => {
        setElectionStatus(res.data.status === "open" ? "Voting is Open" : "Voting is Closed");
      })
      .catch(() => {});
  }, []);

  return (
    <div className="sv-app">
      <Navbar />
      <header className="sv-header">
        <span className="sv-header-badge">Student Portal</span>
        <h1>Welcome, {fullName}!</h1>
        <p>USTP SmartVote — Student Election System</p>
      </header>

      <main className="sv-dashboard">
        <div className="sv-content">
          <section className="sv-stats">
            <div className="sv-stat-card">
              <div className="sv-stat-icon">🗳️</div>
              <h3>Election Status</h3>
              <p className={`sv-status-badge ${electionStatus === "Voting is Open" ? "sv-status-open" : "sv-status-closed"}`}>
                {electionStatus}
              </p>
            </div>
            <div className="sv-stat-card">
              <div className="sv-stat-icon">📋</div>
              <h3>Positions to Vote</h3>
              <p className="sv-stat-value">{positions.length}</p>
            </div>
            <div className="sv-stat-card">
              <div className="sv-stat-icon">✅</div>
              <h3>Your Vote Status</h3>
              <p className={`sv-status-badge ${hasVoted ? "sv-status-open" : "sv-status-closed"}`}>
                {hasVoted ? "Voted" : "Not Yet Voted"}
              </p>
            </div>
          </section>

          <section className="sv-student-action-card">
            <div className="sv-action-left">
              <h2>Ready to Cast Your Vote?</h2>
              <p>You will vote for {positions.length} positions one at a time.</p>
              <div className="sv-positions-list">
                {positions.map((pos, index) => (
                  <span key={pos} className="sv-position-badge">{index + 1}. {pos}</span>
                ))}
              </div>
            </div>
            <div className="sv-action-right">
              <button
                className="sv-btn sv-btn-primary sv-btn-large"
                onClick={() => navigate("/vote")}
                disabled={electionStatus !== "Voting is Open" || hasVoted}
              >
                {hasVoted ? "✅ Already Voted" : "🗳️ Proceed to Vote"}
              </button>
              {hasVoted && (
                <button
                  className="sv-btn sv-btn-outline"
                  onClick={() => navigate("/VoteAnalysis")}
                  style={{ marginTop: "10px" }}
                >
                  View My Votes
                </button>
              )}
            </div>
          </section>

          <section className="sv-announcements">
            <h2 className="sv-section-title">📣 Announcements</h2>
            <div className="sv-announcement-list">
              {announcements.map((a) => (
                <div key={a.id} className="sv-announcement-item">
                  <span className="sv-announcement-icon">{a.icon}</span>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
