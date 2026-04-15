import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import api from "../api";

const positions = ["President", "Vice President", "Secretary", "Treasurer", "Auditor"];

function Results() {
  const navigate = useNavigate();
  const [resultsByPosition, setResultsByPosition] = useState({});
  const [activePosition, setActivePosition]       = useState("President");
  const [loading, setLoading]                     = useState(true);

  useEffect(() => {
    api.get("/results/")
      .then((res) => setResultsByPosition(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading results...</div>;

  const activeCandidates = resultsByPosition[activePosition] || [];
  const totalVotes = activeCandidates.reduce((sum, c) => sum + (c.vote_count || 0), 0);
  const winner     = activeCandidates[0]; // already sorted by vote_count desc from backend

  const getWinner = (pos) => (resultsByPosition[pos] || [])[0];

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-page" style={{ flex: 1 }}>
        <div className="sv-page-container">
          <section className="sv-page-header">
            <h1>🏆 Election Results</h1>
            <p>Official results for the USTP Student Council Election</p>
          </section>

          <section className="sv-results-summary">
            <h2 className="sv-section-title">🎉 Elected Officials</h2>
            <div className="sv-winners-grid">
              {positions.map((pos) => {
                const w = getWinner(pos);
                if (!w) return null;
                return (
                  <div key={pos} className="sv-winner-card">
                    <div className="sv-winner-crown">👑</div>
                    <div className="sv-candidate-avatar" style={{ margin: "0 auto 10px" }}>
                      {w.name.charAt(0)}
                    </div>
                    <h3>{w.name}</h3>
                    <span className="sv-candidate-position">{pos}</span>
                    <div className="sv-winner-votes">{w.vote_count || 0} votes</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="sv-results-detail">
            <h2 className="sv-section-title">📊 Detailed Results</h2>
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

            <div className="sv-results-table-wrap">
              {activeCandidates.map((candidate, index) => {
                const percent  = totalVotes > 0 ? Math.round(((candidate.vote_count || 0) / totalVotes) * 100) : 0;
                const isWinner = winner && candidate.id === winner.id;
                return (
                  <div key={candidate.id} className={`sv-result-row ${isWinner ? "sv-result-winner" : ""}`}>
                    <div className="sv-result-rank">{isWinner ? "👑" : `#${index + 1}`}</div>
                    <div className="sv-candidate-avatar sv-avatar-sm">{candidate.name.charAt(0)}</div>
                    <div className="sv-result-info">
                      <div className="sv-result-name">
                        {candidate.name}
                        {isWinner && <span className="sv-elected-badge">Elected</span>}
                      </div>
                      <div className="sv-result-bar-wrap">
                        <div className="sv-result-bar">
                          <div className={`sv-result-bar-fill ${isWinner ? "sv-bar-winner" : ""}`}
                            style={{ width: `${percent}%` }} />
                        </div>
                        <span className="sv-result-percent">{percent}%</span>
                      </div>
                    </div>
                    <div className="sv-result-votes">{candidate.vote_count || 0} votes</div>
                  </div>
                );
              })}
              {activeCandidates.length === 0 && (
                <p style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>No results yet.</p>
              )}
            </div>
          </section>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <button className="sv-btn sv-btn-outline" onClick={() => navigate(-1)}>← Go Back</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Results;
