import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import useCandidates from "../hooks/useCandidates";

const positions = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "Auditor",
];

const emptyForm = { name: "", position: "President" };

function ManageCandidates() {
  const { candidates } = useCandidates();
  const [localCandidates, setLocalCandidates] = useState(candidates);
  const [activePosition, setActivePosition] = useState("President");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saved, setSaved] = useState(false);

  const filtered = localCandidates.filter((c) => c.position === activePosition);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      setLocalCandidates((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, ...form } : c))
      );
      setEditId(null);
    } else {
      const newCandidate = {
        id: Date.now(),
        name: form.name,
        position: form.position,
        votes: 0,
      };
      setLocalCandidates((prev) => [...prev, newCandidate]);
    }
    setForm(emptyForm);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleEdit = (candidate) => {
    setForm({ name: candidate.name, position: candidate.position });
    setEditId(candidate.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setLocalCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="sv-app">
      <Navbar />

      <main className="sv-page">
        <div className="sv-page-container">

          <section className="sv-page-header">
            <h1>👥 Manage Candidates</h1>
            <p>Add, edit, or remove candidates for each position</p>
          </section>

          {saved && (
            <p style={{ color: "#16a34a", fontWeight: 600, marginBottom: "16px" }}>
              ✅ Candidates updated successfully!
            </p>
          )}

          {!showForm && (
            <button
              className="sv-btn sv-btn-primary"
              onClick={() => setShowForm(true)}
              style={{ marginBottom: "24px" }}
            >
              + Add Candidate
            </button>
          )}

          {showForm && (
            <div className="sv-manage-form-card">
              <h3 style={{ margin: "0 0 16px", fontSize: "1rem", fontWeight: 700 }}>
                {editId ? "Edit Candidate" : "Add New Candidate"}
              </h3>
              <form className="sv-form" onSubmit={handleSubmit}>
                <div className="sv-form-group">
                  <label style={{ color: "#1e293b" }}>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter candidate name"
                    required
                  />
                </div>
                <div className="sv-form-group">
                  <label style={{ color: "#1e293b" }}>Position</label>
                  <select
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="sv-select"
                    style={{ width: "100%" }}
                  >
                    {positions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" className="sv-btn sv-btn-primary">
                    {editId ? "Save Changes" : "Add Candidate"}
                  </button>
                  <button type="button" className="sv-btn sv-btn-outline" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="sv-position-tabs">
            {positions.map((pos) => (
              <button
                key={pos}
                className={`sv-position-tab ${activePosition === pos ? "sv-tab-active" : ""}`}
                onClick={() => setActivePosition(pos)}
              >
                {pos} ({localCandidates.filter((c) => c.position === pos).length})
              </button>
            ))}
          </div>

          <section className="sv-tally-section">
            <table className="sv-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Votes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((candidate, index) => (
                  <tr key={candidate.id}>
                    <td>{index + 1}</td>
                    <td className="sv-candidate-name">{candidate.name}</td>
                    <td>
                      <span className="sv-candidate-position">{candidate.position}</span>
                    </td>
                    <td>{candidate.votes}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="sv-btn sv-btn-outline"
                          style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                          onClick={() => handleEdit(candidate)}
                        >
                          Edit
                        </button>
                        <button
                          className="sv-btn"
                          style={{
                            padding: "6px 14px",
                            fontSize: "0.8rem",
                            background: "#fee2e2",
                            color: "#dc2626",
                            border: "1px solid #fecaca"
                          }}
                          onClick={() => handleDelete(candidate.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>
                      No candidates for this position yet.
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

export default ManageCandidates;