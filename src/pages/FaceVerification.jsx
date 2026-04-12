import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function FaceVerification() {
  const videoRef  = useRef(null);
  const navigate  = useNavigate();
  const [status, setStatus]   = useState("idle");
  const [message, setMessage] = useState("Click 'Start Camera' to begin face verification.");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStatus("streaming");
      setMessage("Position your face in the frame, then click Verify Identity.");
    } catch {
      setStatus("error");
      setMessage("Camera access denied. Please allow camera permissions.");
    }
  };

  const handleVerify = async () => {
    setStatus("verifying");
    setMessage("Scanning your face...");
    // Simulate face verification (2 seconds), then mark verified in backend
    setTimeout(async () => {
      try {
        // Stop the camera stream
        const stream = videoRef.current?.srcObject;
        stream?.getTracks().forEach((t) => t.stop());

        // In a real system you'd send a captured frame to the backend here.
        // For now we simply navigate based on role.
        setStatus("success");
        setMessage("Identity verified! Redirecting...");

        const role = localStorage.getItem("userRole");
        setTimeout(() => {
          if (role === "admin") navigate("/Dashboard");
          else navigate("/StudentDashboard");
        }, 1200);
      } catch {
        setStatus("error");
        setMessage("Verification failed. Please try again.");
      }
    }, 2000);
  };

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
            <div className="sv-camera-overlay"><span>📷</span><p>Camera Off</p></div>
          )}
          {status === "verifying" && (
            <div className="sv-camera-overlay sv-camera-scanning"><span>🔍</span><p>Scanning...</p></div>
          )}
          {status === "success" && (
            <div className="sv-camera-overlay sv-camera-success"><span>✅</span><p>Verified!</p></div>
          )}
        </div>

        <p className={`sv-verify-message sv-verify-${status}`}>{message}</p>

        <div className="sv-verify-actions">
          {status === "idle" && (
            <button className="sv-btn sv-btn-primary" onClick={startCamera}>Start Camera</button>
          )}
          {status === "streaming" && (
            <button className="sv-btn sv-btn-primary" onClick={handleVerify}>Verify Identity</button>
          )}
          {status === "error" && (
            <button className="sv-btn sv-btn-outline" onClick={startCamera}>Retry</button>
          )}
        </div>
      </section>
    </main>
  );
}

export default FaceVerification;
