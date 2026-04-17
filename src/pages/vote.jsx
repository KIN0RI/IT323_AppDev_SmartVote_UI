import Navbar from "../components/layout/Navbar";
import useVote from "../hooks/useVote";

function Vote() {
  const {
    step, positions, currentPosition,
    currentCandidates, currentSelection, selections,
    loading, voteError, reviewing, submitting,
    handleSelect, handleBack, handleConfirm,
  } = useVote();

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-page">
        <div className="sv-page-container">

          {reviewing ? (
            <>
              <section className="sv-page-header">
                <h1>📋 Review Your Votes</h1>
                <p>Please confirm your selections before submitting</p>
              </section>

              {voteError && (
                <p style={{ color: "#dc2626", textAlign: "center", marginBottom: "16px", fontWeight: 500 }}>
                  {voteError}
                </p>
              )}

              <div className="sv-analysis-grid">
                {positions.map((pos) => {
                  const sel = selections.find((s) => s.position === pos);
                  return (
                    <div key={pos} className="sv-analysis-card">
                      <div className="sv-analysis-position">{pos}</div>
                      <div className="sv-analysis-candidate">
                        <div className="sv-candidate-avatar" style={{ margin: "0 auto 10px" }}>
                          {sel ? sel.candidateName.charAt(0) : "?"}
                        </div>
                        <h3>{sel ? sel.candidateName : "No selection"}</h3>
                        <span className="sv-candidate-position">{pos}</span>
                      </div>
                      <div className="sv-analysis-check">📝 Pending Submission</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
                <button
                  className="sv-btn sv-btn-outline"
                  onClick={handleBack}
                  disabled={submitting}
                >
                  ← Return &amp; Change
                </button>
                <button
                  className="sv-btn sv-btn-primary"
                  onClick={handleConfirm}
                  disabled={submitting}
                  style={{ minWidth: "180px" }}
                >
                  {submitting ? "Submitting..." : "✅ Proceed & Submit"}
                </button>
              </div>
            </>
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
                      index < step ? "sv-step-done"
                      : index === step ? "sv-step-active"
                      : "sv-step-pending"
                    }`}
                  >
                    {index < step ? "✓" : index + 1}
                    <span>{pos}</span>
                  </div>
                ))}
              </div>

              {voteError && (
                <p style={{ color: "#dc2626", textAlign: "center", marginBottom: "16px", fontWeight: 500 }}>
                  {voteError}
                </p>
              )}

              {loading ? (
                <p style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>Loading candidates...</p>
              ) : (
                <div className="sv-candidates">
                  {currentCandidates.map((candidate) => {
                    const isSelected = currentSelection?.candidateId === candidate.id;
                    return (
                      <div
                        key={candidate.id}
                        className="sv-candidate-card"
                        style={isSelected
                          ? { border: "2px solid #2563eb", background: "#eff6ff" }
                          : {}}
                      >
                        <div className="sv-candidate-avatar">{candidate.name.charAt(0)}</div>
                        <div className="sv-candidate-info">
                          <h3>{candidate.name}</h3>
                          <span className="sv-candidate-position">{candidate.position}</span>
                          {candidate.course && (
                            <span style={{ fontSize: "0.8rem", color: "#64748b", display: "block" }}>
                              {candidate.course} {candidate.year_level && `· ${candidate.year_level}`}
                            </span>
                          )}
                        </div>
                        <button
                          className={`sv-btn ${isSelected ? "sv-btn-primary" : "sv-btn-outline"}`}
                          onClick={() => handleSelect(candidate.id)}
                        >
                          {isSelected ? "✓ Selected" : "Select"}
                        </button>
                      </div>
                    );
                  })}
                  {currentCandidates.length === 0 && (
                    <p style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>
                      No candidates registered for this position yet.
                    </p>
                  )}
                </div>
              )}

              {step > 0 && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <button className="sv-btn sv-btn-outline" onClick={handleBack}>
                    ← Back to {positions[step - 1]}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default Vote;
