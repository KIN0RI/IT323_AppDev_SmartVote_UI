import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useElectionSettings from "../hooks/useElectionSettings";

function ElectionSettings() {
  const { settings, saved, handleChange, handleSave, handleToggleStatus } = useElectionSettings();

  return (
    <div className="sv-app">
      <Navbar />
      <main className="sv-page" style={{ flex: 1 }}>
        <div className="sv-page-container">

          <section className="sv-page-header">
            <h1>⚙️ Election Settings</h1>
            <p>Configure and manage the election parameters</p>
          </section>

          {saved && (
            <div className="sv-settings-success">
              ✅ Settings saved successfully!
            </div>
          )}

          <div className="sv-settings-status-card">
            <div className="sv-settings-status-left">
              <h2>Election Status</h2>
              <p>Control whether voting is currently open or closed</p>
            </div>
            <div className="sv-settings-status-right">
              <span className={`sv-status-badge ${settings.status === "open" ? "sv-status-open" : "sv-status-closed"}`}>
                {settings.status === "open" ? "🟢 Voting Open" : "🔴 Voting Closed"}
              </span>
              <button
                className="sv-btn sv-btn-primary"
                onClick={handleToggleStatus}
                style={settings.status === "open" ? {
                  background: "#dc2626",
                  color: "#fff",
                  border: "none"
                } : {}}
              >
                {settings.status === "open" ? "Close Election" : "Open Election"}
              </button>
            </div>
          </div>

          <div className="sv-settings-card">
            <h2 className="sv-section-title">📋 General Settings</h2>
            <form className="sv-settings-form" onSubmit={handleSave}>

              <div className="sv-settings-group">
                <label>Election Title</label>
                <input
                  name="electionTitle"
                  value={settings.electionTitle}
                  onChange={handleChange}
                  placeholder="Enter election title"
                />
              </div>

              <div className="sv-settings-row">
                <div className="sv-settings-group">
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={settings.startDate} onChange={handleChange} />
                </div>
                <div className="sv-settings-group">
                  <label>Start Time</label>
                  <input type="time" name="startTime" value={settings.startTime} onChange={handleChange} />
                </div>
              </div>

              <div className="sv-settings-row">
                <div className="sv-settings-group">
                  <label>End Date</label>
                  <input type="date" name="endDate" value={settings.endDate} onChange={handleChange} />
                </div>
                <div className="sv-settings-group">
                  <label>End Time</label>
                  <input type="time" name="endTime" value={settings.endTime} onChange={handleChange} />
                </div>
              </div>

              <h2 className="sv-section-title" style={{ marginTop: "24px" }}>🔒 Security Settings</h2>

              <div className="sv-settings-toggle-group">
                <div className="sv-settings-toggle-info">
                  <h3>Face Verification</h3>
                  <p>Require face verification before voting</p>
                </div>
                <label className="sv-toggle">
                  <input
                    type="checkbox"
                    name="requireFaceVerification"
                    checked={settings.requireFaceVerification}
                    onChange={handleChange}
                  />
                  <span className="sv-toggle-slider" />
                </label>
              </div>

              <div className="sv-settings-toggle-group">
                <div className="sv-settings-toggle-info">
                  <h3>Allow Multiple Votes</h3>
                  <p>Allow a voter to cast votes more than once</p>
                </div>
                <label className="sv-toggle">
                  <input
                    type="checkbox"
                    name="allowMultipleVotes"
                    checked={settings.allowMultipleVotes}
                    onChange={handleChange}
                  />
                  <span className="sv-toggle-slider" />
                </label>
              </div>

              <div style={{ marginTop: "28px" }}>
                <button type="submit" className="sv-btn sv-btn-primary">
                  💾 Save Settings
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ElectionSettings;