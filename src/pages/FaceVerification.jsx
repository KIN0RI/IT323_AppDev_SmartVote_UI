import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function FaceVerification() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Click 'Start Camera' to begin face verification.");
  const [role] = useState(() => {
    const stored = localStorage.getItem("userRole");
    return stored === "admin" ? "admin" : "student";
  });

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 360 },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStatus("streaming");
      setMessage("Position your face within the frame, then click 'Verify'.");
    } catch {
      setStatus("error");
      setMessage("Camera access denied. Please allow camera permissions.");
    }
  }, []);

  const handleVerify = () => {
    setStatus("verifying");
    setMessage("Verifying identity...");

    setTimeout(() => {
      setStatus("success");
      setMessage("Identity verified! Redirecting to dashboard...");

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      setTimeout(() => {
        navigate(role === "admin" ? "/Dashboard" : "/StudentDashboard");
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <main className="sv-page sv-page-center">
      <section className="sv-verify-card">
        <div className="sv-verify-header">
          <span className="sv-verify-icon">📸</span>
          <h1>Face Verification</h1>
          <p>Confirm your identity to proceed</p>
        </div>

        <div className="sv-camera-wrapper">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="sv-camera-feed"
          />
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