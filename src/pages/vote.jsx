import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import useCandidates from "../hooks/useCandidates";

const positions = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "Auditor",
];

function Vote() {
  const navigate = useNavigate();
  const { candidates, castVote } = useCandidates();
  const [step, setStep] = useState(0);
  const [votedChoices, setVotedChoices] = useState([]);

  const currentPosition = positions[step];
  const isDone = step >= positions.length;

  const currentCandidates = candidates.filter(
    (c) => c.position === currentPosition
  );

  const handleVote = (candidateId) => {
    const chosen = candidates.find((c) => c.id === candidateId);
    if (!chosen) return;
    castVote(candidateId);
    const newChoices = [
      ...votedChoices,
      { position: chosen.position, candidateName: chosen.name },
    ];
    setVotedChoices(newChoices);
    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep >= positions.length) {
      navigate("/VoteAnalysis", {
        state: { votes: newChoices, fromVote: true },
      });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setVotedChoices((prev) => prev.slice(0, -1));
      setStep(step - 1);
    }
  };

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-page">
        <div className="sv-page-container">

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

          {step > 0 && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button className="sv-btn sv-btn-outline" onClick={handleBack}>
                ← Back to {positions[step - 1]}
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default Vote;
