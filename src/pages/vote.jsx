import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function Vote() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [candidates, setCandidates] = useState([
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
  ]);

  const positions = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Auditor",
  ];

  const currentPosition = positions[step];
  const isDone = step >= positions.length;

  const currentCandidates = candidates.filter(
    (c) => c.position === currentPosition
  );

  const handleVote = (candidateId) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      )
    );
    setStep(step + 1);
  };

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-page">
        <div className="sv-page-container">

          {isDone ? (
            <section className="sv-vote-success">
              <span className="sv-vote-success-icon">🎉</span>
              <h2>Voting Completed!</h2>
              <p>Your votes have been recorded successfully.</p>
              <button
                className="sv-btn sv-btn-primary"
                onClick={() => navigate("/StudentDashboard")}
                style={{ marginTop: "20px" }}
              >
                Back to Dashboard
              </button>
            </section>
          ) : (
            <>
        
              <section className="sv-page-header">
                <h1>Cast Your Vote</h1>
                <p>
                  Step {step + 1} of {positions.length} — Voting for{" "}
                  <strong>{currentPosition}</strong>
                </p>
              </section>

        
              <div className="sv-vote-progress">
                {positions.map((pos, index) => (
                  <div
                    key={pos}
                    className={`sv-vote-step ${
                      index < step
                        ? "sv-step-done"
                        : index === step
                        ? "sv-step-active"
                        : "sv-step-pending"
                    }`}
                  >
                    {index < step ? "✓" : index + 1}
                    <span>{pos}</span>
                  </div>
                ))}
              </div>

  
              <div className="sv-candidates">
                {currentCandidates.map((candidate) => (
                  <div key={candidate.id} className="sv-candidate-card">
                    <div className="sv-candidate-avatar">
                      {candidate.name.charAt(0)}
                    </div>
                    <div className="sv-candidate-info">
                      <h3>{candidate.name}</h3>
                      <span className="sv-candidate-position">
                        {candidate.position}
                      </span>
                    </div>
                    <button
                      className="sv-btn sv-btn-primary"
                      onClick={() => handleVote(candidate.id)}
                    >
                      Vote
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default Vote;