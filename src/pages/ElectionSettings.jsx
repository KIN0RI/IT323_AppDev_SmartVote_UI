import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useElectionSettings from "../hooks/useElectionSettings";

function ElectionSettings() {
  const { settings, saved, loading, handleChange, handleSave, handleToggleStatus } = useElectionSettings();

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading settings...</div>;

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
            <div className="sv-settings-success">✅ Settings saved successfully!</div>
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
                style={settings.status === "open" ? { background: "#dc2626", color: "#fff", border: "none" } : {}}
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
                <input name="title" value={settings.title || ""} onChange={handleChange} placeholder="Enter election title" />
              </div>

              <div className="sv-settings-row">
                <div className="sv-settings-group">
                  <label>Start Date &amp; Time</label>
                  <input type="datetime-local" name="start_date"
                    value={settings.start_date ? settings.start_date.slice(0, 16) : ""}
                    onChange={handleChange} />
                </div>
                <div className="sv-settings-group">
                  <label>End Date &amp; Time</label>
                  <input type="datetime-local" name="end_date"
                    value={settings.end_date ? settings.end_date.slice(0, 16) : ""}
                    onChange={handleChange} />
                </div>
              </div>

              <h2 className="sv-section-title" style={{ marginTop: "24px" }}>🔒 Security Settings</h2>

              <div className="sv-settings-toggle-group">
                <div className="sv-settings-toggle-info">
                  <h3>Face Verification</h3>
                  <p>Require face verification before voting</p>
                </div>
                <label className="sv-toggle">
                  <input type="checkbox" name="require_face_verification"
                    checked={settings.require_face_verification || false}
                    onChange={handleChange} />
                  <span className="sv-toggle-slider" />
                </label>
              </div>

              <div className="sv-settings-toggle-group">
                <div className="sv-settings-toggle-info">
                  <h3>Allow Multiple Votes</h3>
                  <p>Allow a voter to cast votes more than once</p>
                </div>
                <label className="sv-toggle">
                  <input type="checkbox" name="allow_multiple_votes"
                    checked={settings.allow_multiple_votes || false}
                    onChange={handleChange} />
                  <span className="sv-toggle-slider" />
                </label>
              </div>

              <div style={{ marginTop: "28px" }}>
                <button type="submit" className="sv-btn sv-btn-primary">💾 Save Settings</button>
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
