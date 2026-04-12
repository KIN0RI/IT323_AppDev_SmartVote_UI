import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useVoterLog from "../hooks/useVoterLog";
import "../styles/Dashboard.css";

function VoterLog() {
  const { logs, loading, search, setSearch, filter, setFilter } = useVoterLog();

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-dashboard" style={{ flex: 1 }}>
        <div className="sv-content">
          <div className="sv-monitoring-header">
            <h2>Voter Login Log</h2>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              {logs.length} record(s) found
            </span>
          </div>

          <div className="sv-voter-controls">
            <input
              type="text"
              className="sv-voter-search"
              placeholder="Search by name or student ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="sv-voter-filters">
              {["All", "Voted", "Pending"].map((f) => (
                <button
                  key={f}
                  className={`sv-filter-btn ${filter === f ? "sv-filter-active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <section className="sv-tally-section">
            {loading ? (
              <p style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>Loading...</p>
            ) : (
              <table className="sv-table">
                <thead>
                  <tr>
                    <th>#</th><th>Name</th><th>Student ID</th>
                    <th>Email</th><th>Login Time</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((voter, index) => (
                    <tr key={voter.id}>
                      <td data-label="#">{index + 1}</td>
                      <td data-label="Name" className="sv-candidate-name">{voter.name}</td>
                      <td data-label="Student ID">{voter.student_id}</td>
                      <td data-label="Email">{voter.email}</td>
                      <td data-label="Login Time">
                        {new Date(voter.login_time).toLocaleTimeString()}
                      </td>
                      <td data-label="Status">
                        <span className={`sv-voter-status ${voter.status === "Voted" ? "sv-status-voted" : "sv-status-pending"}`}>
                          {voter.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default VoterLog;
