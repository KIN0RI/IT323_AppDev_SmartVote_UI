import { useState } from "react";
import "./Dashboard.css";

import StatCard from "./StatCard";
import CandidateRow from "./CandidateRow";
import MonitoringInsight from "./MonitoringInsight";

function Dashboard() {
  const electionStats = {
    totalVoters: 1200,
    votesCast: 860,
    remainingVoters: 340,
  };

  
  const candidates = [
    { id: 1, name: "Ronald Yu", position: "President", votes: 320 },
    { id: 2, name: "Vhon Salilo", position: "President", votes: 280 },
    { id: 3, name: "Dan Ivan Labin", position: "Vice President", votes: 260 },
  ];

 
  const insights = [
    {
      id: 1,
      title: "Anomaly Detection",
      status: "No suspicious voting activity detected",
      confidence: 91,
    },
    {
      id: 2,
      title: "Turnout Pattern Analysis",
      status: "Normal participation trend observed",
      confidence: 84,
    },
  ];

  
  const turnoutPercent = Math.round(
    (electionStats.votesCast / electionStats.totalVoters) * 100
  );

  const maxVotes = Math.max(...candidates.map((c) => c.votes));

  
  const [showInsights, setShowInsights] = useState(false);

  return (
    <main className="sv-dashboard">
      <header className="sv-header">
        <span className="sv-header-badge">Live Election</span>
        <h1>USTP SmartVote</h1>
        <p>QR Code–Based Student Election Monitoring Dashboard</p>
      </header>

      <div className="sv-content">
        <section className="sv-progress-section">
          <div className="sv-progress-label">
            <span>Voter Turnout</span>
            <strong>{turnoutPercent}%</strong>
          </div>

          <div className="sv-progress-track">
            <div
              className="sv-progress-fill"
              style={{ width: `${turnoutPercent}%` }}
            />
          </div>
        </section>

        <section className="sv-stats">
          <StatCard
            icon="👥"
            title="Total Voters"
            value={electionStats.totalVoters.toLocaleString()}
          />

          <StatCard
            icon="✅"
            title="Votes Cast"
            value={electionStats.votesCast.toLocaleString()}
          />

          <StatCard
            icon="⏳"
            title="Remaining Voters"
            value={electionStats.remainingVoters.toLocaleString()}
          />
        </section>

        <section className="sv-tally-section">
          <div className="sv-tally-header">
            <h2>Candidate Vote Tally</h2>
          </div>

          <table className="sv-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Position</th>
                <th>Progress</th>
                <th>Votes</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((candidate) => (
                <CandidateRow
                  key={candidate.id}
                  candidate={candidate}
                  maxVotes={maxVotes}
                />
              ))}
            </tbody>
          </table>
        </section>

        <section className="sv-monitoring">
          <div className="sv-monitoring-header">
            <h2>AI Monitoring Insights</h2>

            <button
              onClick={() => setShowInsights(!showInsights)}
            >
              {showInsights ? "Hide Insights" : "Show Insights"}
            </button>
          </div>

          {showInsights && (
            <div className="sv-insight-grid">
              {insights.map((item) => (
                <MonitoringInsight
                  key={item.id}
                  title={item.title}
                  status={item.status}
                  confidence={item.confidence}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="sv-footer">
          USTP SmartVote © 2026 — Database-Driven QR Code Voting System with
          AI-Assisted Monitoring
        </footer>
      </div>
    </main>
  );
}

export default Dashboard;
