import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import api from "../api";

function VoteAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const [votes, setVotes]     = useState(location.state?.votes || []);
  const [loading, setLoading] = useState(votes.length === 0);

  useEffect(() => {
    if (votes.length === 0) {
      api.get("/vote/my/")
        .then((res) => {
          const formatted = res.data.map((v) => ({
            position:      v.position,
            candidateName: v.candidate_name,
          }));
          setVotes(formatted);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading your votes...</div>;

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-page">
        <div className="sv-page-container">

          <section className="sv-page-header">
            <h1>🗳️ Vote Analysis</h1>
            <p>Review your submitted votes below</p>
          </section>

          {votes.length === 0 ? (
            <section className="sv-vote-success">
              <span className="sv-vote-success-icon">⚠️</span>
              <h2>No vote data found</h2>
              <p>Please go back and cast your vote first.</p>
              <button
                className="sv-btn sv-btn-primary"
                onClick={() => navigate("/vote")}
                style={{ marginTop: "20px" }}
              >
                Go to Vote Page
              </button>
            </section>
          ) : (
            <>
              <div className="sv-analysis-grid">
                {votes.map((v) => (
                  <div key={v.position} className="sv-analysis-card">
                    <div className="sv-analysis-position">{v.position}</div>
                    <div className="sv-analysis-candidate">
                      <div className="sv-candidate-avatar" style={{ margin: "0 auto 10px" }}>
                        {v.candidateName.charAt(0)}
                      </div>
                      <h3>{v.candidateName}</h3>
                      <span className="sv-candidate-position">{v.position}</span>
                    </div>
                    <div className="sv-analysis-check">✅ Vote Recorded</div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <button
                  className="sv-btn sv-btn-primary"
                  onClick={() => navigate("/StudentDashboard")}
                >
                  Back to Dashboard
                </button>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default VoteAnalysis;
