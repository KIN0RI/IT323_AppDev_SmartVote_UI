import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function FaceVerification() {
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const navigate   = useNavigate();

  const [status,    setStatus]    = useState("idle");
  const [message,   setMessage]   = useState("Click 'Start Camera' to begin face verification.");
  const [confidence, setConfidence] = useState(null);
  const [dots, setDots]           = useState("");

  
  useEffect(() => {
    if (status !== "verifying") return;
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 500);
    return () => clearInterval(t);
  }, [status]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });
      videoRef.current.srcObject = stream;
      setStatus("streaming");
      setMessage("Position your face clearly in the frame, then click Verify Identity.");
    } catch {
      setStatus("error");
      setMessage("Camera access denied. Please allow camera permissions and try again.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((t) => t.stop());
  };

  const captureFrame = () => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
   
    return canvas.toDataURL("image/jpeg", 0.9);
  };

  const handleVerify = async () => {
    setStatus("verifying");
    setConfidence(null);
    setMessage("Scanning your face");

    try {
      // Capture frame from webcam
      const imageBase64 = captureFrame();

      // Send to FastAPI /api/face/verify/
      const response = await api.post("/face/verify/", { image: imageBase64 });
      const { verified, confidence: conf, method, message: msg } = response.data;

      stopCamera();

      if (verified) {
        setStatus("success");
        setConfidence(Math.round(conf * 100));
        setMessage(`Identity verified! Confidence: ${Math.round(conf * 100)}%`);

        const role = localStorage.getItem("userRole");
        setTimeout(() => {
          if (role === "admin") navigate("/Dashboard");
          else navigate("/StudentDashboard");
        }, 1500);
      } else {
        setStatus("failed");
        setConfidence(Math.round(conf * 100));
        setMessage(msg || "Face does not match. Please try again.");
      }
    } catch (err) {
      const detail = err.response?.data?.detail || "Verification failed. Please try again.";
      setStatus("error");
      setMessage(detail);
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setMessage("Click 'Start Camera' to begin face verification.");
    setConfidence(null);
  };

  return (
    <main className="sv-page sv-page-center">
      <section className="sv-verify-card">
        <div className="sv-verify-header">
          <span className="sv-verify-icon">📸</span>
          <h1>Face Verification</h1>
          <p>Confirm your identity using the PCA + SVM model</p>
        </div>

        
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="sv-camera-wrapper">
          <video ref={videoRef} autoPlay playsInline muted className="sv-camera-feed" />

          {status === "idle" && (
            <div className="sv-camera-overlay">
              <span>📷</span><p>Camera Off</p>
            </div>
          )}
          {status === "verifying" && (
            <div className="sv-camera-overlay sv-camera-scanning">
              <span>🔍</span><p>Scanning{dots}</p>
            </div>
          )}
          {status === "success" && (
            <div className="sv-camera-overlay sv-camera-success">
              <span>✅</span><p>Verified!</p>
            </div>
          )}
          {status === "failed" && (
            <div className="sv-camera-overlay" style={{ background: "rgba(220,38,38,0.7)" }}>
              <span>❌</span><p>Not Matched</p>
            </div>
          )}
        </div>

        <p className={`sv-verify-message sv-verify-${status}`}>{message}</p>

        {confidence !== null && (
          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>
            Similarity confidence: <strong>{confidence}%</strong>
          </p>
        )}

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
          {(status === "error" || status === "failed") && (
            <button className="sv-btn sv-btn-outline" onClick={handleRetry}>
              Try Again
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default FaceVerification;
