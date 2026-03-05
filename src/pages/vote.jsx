import Navbar from "../components/layout/Navbar";
import useVote from "../hooks/useVote";

function Vote() {
  const {
    step,
    positions,
    currentPosition,
    currentCandidates,
    handleVote,
    handleBack,
  } = useVote();

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
