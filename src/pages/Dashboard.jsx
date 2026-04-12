import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import StatCard from "../components/StatCard";
import MonitoringInsight from "../components/MonitoringInsight";
import api from "../api";
import "../styles/Dashboard.css";

const positions = ["President", "Vice President", "Secretary", "Treasurer", "Auditor"];

const insights = [
  { id: 1, title: "Anomaly Detection",        status: "No suspicious voting activity detected", confidence: 91 },
  { id: 2, title: "Turnout Pattern Analysis", status: "Normal participation trend observed",     confidence: 84 },
];

function AdminDashboard() {
  const [stats, setStats]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [showInsights, setShowInsights] = useState(false);
  const [activePosition, setActivePosition] = useState("President");

  useEffect(() => {
    api.get("/dashboard/")
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading dashboard...</div>;
  if (!stats)  return <div style={{ padding: "40px", textAlign: "center" }}>Failed to load data.</div>;

  const filteredCandidates = (stats.candidates_by_position?.[activePosition] || []);
  const maxVotes = Math.max(...filteredCandidates.map((c) => c.vote_count || 0), 1);

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-dashboard">
        <header className="sv-header">
          <span className="sv-header-badge">Admin Panel</span>
          <h1>USTP SmartVote</h1>
          <p>Election Monitoring Dashboard</p>
        </header>

        <div className="sv-content">
          <section className="sv-progress-section">
            <div className="sv-progress-label">
              <span>Voter Turnout</span>
              <strong>{stats.turnout_percent}%</strong>
            </div>
            <div className="sv-progress-track">
              <div className="sv-progress-fill" style={{ width: `${stats.turnout_percent}%` }} />
            </div>
          </section>

          <section className="sv-stats">
            <StatCard icon="👥" title="Total Voters"  value={stats.total_voters.toLocaleString()} />
            <StatCard icon="✅" title="Votes Cast"    value={stats.votes_cast.toLocaleString()} />
            <StatCard icon="⏳" title="Remaining"     value={stats.remaining_voters.toLocaleString()} />
          </section>

          <section className="sv-tally-section">
            <div className="sv-tally-header">
              <h2>Candidate Vote Tally</h2>
            </div>
            <div className="sv-position-tabs">
              {positions.map((pos) => (
                <button
                  key={pos}
                  className={`sv-position-tab ${activePosition === pos ? "sv-tab-active" : ""}`}
                  onClick={() => setActivePosition(pos)}
                >
                  {pos}
                </button>
              ))}
            </div>
            <table className="sv-table">
              <thead>
                <tr><th>Candidate</th><th>Position</th><th>Progress</th><th>Votes</th></tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td data-label="Candidate" className="sv-candidate-name">{candidate.name}</td>
                    <td data-label="Position">
                      <span className="sv-candidate-position">{candidate.position}</span>
                    </td>
                    <td data-label="Progress">
                      <div className="sv-vote-bar-bg">
                        <div
                          className="sv-vote-bar"
                          style={{ width: `${Math.round(((candidate.vote_count || 0) / maxVotes) * 100)}%` }}
                        />
                      </div>
                    </td>
                    <td data-label="Votes" className="sv-vote-count">{candidate.vote_count || 0}</td>
                  </tr>
                ))}
                {filteredCandidates.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "#64748b" }}>No candidates yet.</td></tr>
                )}
              </tbody>
            </table>
          </section>

          <section className="sv-monitoring">
            <div className="sv-monitoring-header">
              <h2>AI Monitoring Insights</h2>
              <button onClick={() => setShowInsights(!showInsights)}>
                {showInsights ? "Hide Insights" : "Show Insights"}
              </button>
            </div>
            {showInsights && (
              <div className="sv-insight-grid">
                {insights.map((item) => (
                  <MonitoringInsight key={item.id} title={item.title} status={item.status} confidence={item.confidence} />
                ))}
              </div>
            )}
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default AdminDashboard;
