import "./Dashboard.css";

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

  const turnoutPercent = Math.round(
    (electionStats.votesCast / electionStats.totalVoters) * 100
  );

  const maxVotes = Math.max(...candidates.map((c) => c.votes));

  return (
    <main className="sv-dashboard">
      {/* FULL-WIDTH HEADER */}
      <header className="sv-header">
        <span className="sv-header-badge">Live Election</span>
        <h1>USTP SmartVote</h1>
        <p>Student Election Monitoring Dashboard</p>
      </header>

      {/* FULLSCREEN CONTENT AREA */}
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
          <article className="sv-stat-card">
            <div className="sv-stat-icon sv-stat-icon--voters">👥</div>
            <h3>Total Voters</h3>
            <p className="sv-stat-value">
              {electionStats.totalVoters.toLocaleString()}
            </p>
          </article>

          <article className="sv-stat-card">
            <div className="sv-stat-icon sv-stat-icon--cast">✅</div>
            <h3>Votes Cast</h3>
            <p className="sv-stat-value">
              {electionStats.votesCast.toLocaleString()}
            </p>
          </article>

          <article className="sv-stat-card">
            <div className="sv-stat-icon sv-stat-icon--remaining">⏳</div>
            <h3>Remaining</h3>
            <p className="sv-stat-value">
              {electionStats.remainingVoters.toLocaleString()}
            </p>
          </article>
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
              {candidates.map((c) => (
                <tr key={c.id}>
                  <td className="sv-candidate-name">{c.name}</td>
                  <td>
                    <span className="sv-candidate-position">{c.position}</span>
                  </td>
                  <td>
                    <div className="sv-vote-bar-bg">
                      <div
                        className="sv-vote-bar"
                        style={{ width: `${(c.votes / maxVotes) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="sv-vote-count">{c.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="sv-footer">
          USTP SmartVote © 2026 — QR Code-Based Voting System
        </footer>
      </div>
    </main>
  );
}

export default Dashboard;
