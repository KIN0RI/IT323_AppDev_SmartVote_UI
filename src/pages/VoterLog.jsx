import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import "../styles/Dashboard.css";

const mockVoterLog = [
  { id: 1, name: "Juan Dela Cruz", studentId: "2024-00101", email: "juan@gmail.com", loginTime: "8:02 AM", status: "Voted" },
  { id: 2, name: "Maria Santos", studentId: "2024-00102", email: "maria@gmail.com", loginTime: "8:15 AM", status: "Voted" },
  { id: 3, name: "Pedro Reyes", studentId: "2024-00103", email: "pedro@gmail.com", loginTime: "8:30 AM", status: "Pending" },
  { id: 4, name: "Ana Lim", studentId: "2024-00104", email: "ana@gmail.com", loginTime: "8:45 AM", status: "Voted" },
  { id: 5, name: "Carlos Mendoza", studentId: "2024-00105", email: "carlos@gmail.com", loginTime: "9:00 AM", status: "Pending" },
  { id: 6, name: "Rosa Garcia", studentId: "2024-00106", email: "rosa@gmail.com", loginTime: "9:10 AM", status: "Voted" },
  { id: 7, name: "Jose Torres", studentId: "2024-00107", email: "jose@gmail.com", loginTime: "9:25 AM", status: "Voted" },
  { id: 8, name: "Luz Ramos", studentId: "2024-00108", email: "luz@gmail.com", loginTime: "9:40 AM", status: "Pending" },
];

function VoterLog() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = mockVoterLog.filter((voter) => {
    const matchSearch =
      voter.name.toLowerCase().includes(search.toLowerCase()) ||
      voter.studentId.includes(search);
    const matchFilter = filter === "All" || voter.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="sv-app">
      <Navbar />

      <main className="sv-dashboard" style={{ flex: 1 }}>
        <div className="sv-content">

          <div className="sv-monitoring-header">
            <h2>Voter Login Log</h2>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              {filtered.length} record(s) found
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
              {["All", "Voted", "Not Yet Voted"].map((f) => (
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
            <table className="sv-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Student ID</th>
                  <th>Email</th>
                  <th>Login Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((voter) => (
                  <tr key={voter.id}>
                    <td data-label="#">{voter.id}</td>
                    <td data-label="Name" className="sv-candidate-name">{voter.name}</td>
                    <td data-label="Student ID">{voter.studentId}</td>
                    <td data-label="Email">{voter.email}</td>
                    <td data-label="Login Time">{voter.loginTime}</td>
                    <td data-label="Status">
                      <span className={`sv-voter-status ${voter.status === "Voted" ? "sv-status-voted" : "sv-status-pending"}`}>
                        {voter.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

        </div>
      </main>

    
      <footer className="sv-footer">
        USTP SmartVote © 2026 — Database-Driven QR Code Voting System with AI-Assisted Monitoring
      </footer>

    </div>
  );
}

export default VoterLog;