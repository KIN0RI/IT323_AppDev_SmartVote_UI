import useFaceVerification from "../hooks/useFaceVerification";

function FaceVerification() {
  const { videoRef, status, message, startCamera, handleVerify } = useFaceVerification();

  return (
    <main className="sv-page sv-page-center">
      <section className="sv-verify-card">
        <div className="sv-verify-header">
          <span className="sv-verify-icon">📸</span>
          <h1>Face Verification</h1>
          <p>Confirm your identity to proceed</p>
        </div>

        <div className="sv-camera-wrapper">
          <video ref={videoRef} autoPlay playsInline muted className="sv-camera-feed" />
          {status === "idle" && (
            <div className="sv-camera-overlay">
              <span>📷</span>
              <p>Camera Off</p>
            </div>
          )}
          {status === "verifying" && (
            <div className="sv-camera-overlay sv-camera-scanning">
              <span>🔍</span>
              <p>Scanning...</p>
            </div>
          )}
          {status === "success" && (
            <div className="sv-camera-overlay sv-camera-success">
              <span>✅</span>
              <p>Verified!</p>
            </div>
          )}
        </div>

        <p className={`sv-verify-message sv-verify-${status}`}>{message}</p>

        <div className="sv-verify-actions">
          {status === "idle" && (
            <button className="sv-btn sv-btn-primary" onClick={startCamera}>
              Start Camera
            </button>
          )}
          {status === "streaming" && (
            <button className="sv-btn sv-btn-primary" onClick={handleVerify}>
              Verify Identity
            </button>
          )}
          {status === "error" && (
            <button className="sv-btn sv-btn-outline" onClick={startCamera}>
              Retry
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default FaceVerification;
