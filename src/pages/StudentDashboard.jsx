import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import "../styles/Dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const [electionStatus] = useState("Voting is Open");

  return (
    <div className="sv-app">

      <Navbar />
      <main className="sv-dashboard">
        <header className="sv-header">
          <span className="sv-header-badge">Student Portal</span>
          <h1>Welcome, Student!</h1>
          <p>USTP SmartVote — Student Election System</p>
        </header>

        <div className="sv-content">
          <section className="sv-student-status">
            <div className="sv-status-card">
              <span className="sv-status-icon">🗳️</span>
              <h2>Election Status</h2>
              <p className={`sv-status-badge ${electionStatus === "Voting is Open" ? "sv-status-open" : "sv-status-closed"}`}>
                {electionStatus}
              </p>
            </div>
          </section>

          <section className="sv-student-action">
            <button
              className="sv-btn-vote"
              onClick={() => navigate("/vote")}
              disabled={electionStatus !== "Voting is Open"}
            >
              Proceed to Vote
            </button>
          </section>
        </div>

      </main>

      <footer className="sv-footer">
        USTP SmartVote © 2026 — Database-Driven QR Code Voting System with
        AI-Assisted Monitoring
      </footer>
    </div>
  );
}

export default StudentDashboard;