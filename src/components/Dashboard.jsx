import { useState } from "react";
import "./Dashboard.css";

import StatCard from "./StatCard";
import CandidateRow from "./CandidateRow";
import MonitoringInsight from "./MonitoringInsight";

import ustpLogo from "../assets/logo.png";

function Dashboard() {
  const electionStats = {
    totalVoters: 2000,
    votesCast: 1895,
    remainingVoters: 105,
  };

  
  const candidates = [
    { id: 1, name: "Ronald Yu", position: "President", votes: 320 },
    { id: 2, name: "Vhon Salilo", position: "President", votes: 280 },
    { id: 3, name: "Dan Ivan Labin", position: "Vice President", votes: 260 },
    { id: 4, name: "Christian Paul Bahian", position: "Vice President", votes: 200 },
    { id: 5, name: "Nepthalie Brynt Asinero", position: "Secretary", votes: 180 },
    { id: 6, name: "Dan Ronald Salilo", position: "Secretary", votes: 150 },
    { id: 7, name: "Christian Ivan Yu", position: "Treasurer", votes: 145 },
    { id: 8, name: "Ronald Paul Asinero", position: "Treasurer", votes: 130 },
    { id: 9, name: "Vhon Brynt Labin", position: "Auditor", votes: 120 },
    { id: 10, name: "Dan Angelico Bahian", position: "Auditor", votes: 110 },
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
        <div className="sv-header-brand">
          <img 
            src={ustpLogo}
            alt="USTP Logo" 
            className="sv-logo" 
          />
          <h1>USTP SmartVote</h1>
        </div>
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
