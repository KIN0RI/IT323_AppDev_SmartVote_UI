import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function VoteAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const votes = location.state?.votes || [];
  const fromVote = location.state?.fromVote || false;
  const [submitted, setSubmitted] = useState(false);

  const handleConfirmSubmit = () => {
    setSubmitted(true);
  };

  const handleGoBack = () => {
    navigate("/vote");
  };

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-page">
        <div className="sv-page-container">

  
          {submitted ? (
            <section className="sv-vote-success">
              <span className="sv-vote-success-icon">🎉</span>
              <h2>Vote Recorded!</h2>
              <p>Your votes have been successfully submitted. Thank you for participating!</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
                <button
                  className="sv-btn sv-btn-primary"
                  onClick={() => navigate("/StudentDashboard")}
                >
                  Back to Dashboard
                </button>
              </div>
            </section>

          ) : votes.length === 0 ? (

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
              <section className="sv-page-header">
                <h1>🗳️ Review Your Votes</h1>
                <p>
                  {fromVote
                    ? "Please review your selections before submitting. You can go back to change your votes."
                    : "Your submitted votes are shown below."}
                </p>
              </section>

              <div className="sv-analysis-grid">
                {votes.map((v) => (
                  <div key={v.position} className="sv-analysis-card">
                    <div className="sv-analysis-position">{v.position}</div>
                    <div className="sv-analysis-candidate">
                      <div
                        className="sv-candidate-avatar"
                        style={{ margin: "0 auto 10px" }}
                      >
                        {v.candidateName.charAt(0)}
                      </div>
                      <h3>{v.candidateName}</h3>
                      <span className="sv-candidate-position">{v.position}</span>
                    </div>
                    <div className="sv-analysis-check">✅ Selected</div>
                  </div>
                ))}
              </div>

              {fromVote ? (
   
                <div className="sv-analysis-actions">
                  <div className="sv-analysis-warning">
                    ⚠️ Once submitted, your votes cannot be changed.
                  </div>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                      className="sv-btn sv-btn-outline"
                      onClick={handleGoBack}
                    >
                      ← Go Back & Change Votes
                    </button>
                    <button
                      className="sv-btn sv-btn-primary"
                      onClick={handleConfirmSubmit}
                    >
                      ✅ Confirm & Submit Votes
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                  <button
                    className="sv-btn sv-btn-primary"
                    onClick={() => navigate("/StudentDashboard")}
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default VoteAnalysis;