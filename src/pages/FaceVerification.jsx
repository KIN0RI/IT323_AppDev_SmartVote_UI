import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function FaceVerification() {
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const navigate   = useNavigate();

  const [status,      setStatus]      = useState("idle");
  const [message,     setMessage]     = useState("Click 'Start Camera' to begin face verification.");
  const [confidence,  setConfidence]  = useState(null);
  const [method,      setMethod]      = useState(null);
  const [predictedId, setPredictedId] = useState(null);
  const [dots,        setDots]        = useState("");

  useEffect(() => {
    if (status !== "verifying") return;
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 500);
    return () => clearInterval(t);
  }, [status]);

  const startCamera = async () => {
    setConfidence(null);
    setMethod(null);
    setPredictedId(null);
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
    setMethod(null);
    setPredictedId(null);
    setMessage("Running PCA + SVM pipeline");

    try {
      const imageBase64 = captureFrame();
      const response = await api.post("/face/verify/", { image: imageBase64 });
      const { verified, confidence: conf, method: m, message: msg, predicted_id } = response.data;

      stopCamera();
      setConfidence(conf);
      setMethod(m);
      setPredictedId(predicted_id ?? null);

      if (verified) {
        setStatus("success");
        setMessage(`Identity verified! Confidence: ${Math.round(conf * 100)}%`);
        const role = localStorage.getItem("userRole");
        setTimeout(() => {
          if (role === "admin") navigate("/Dashboard");
          else navigate("/StudentDashboard");
        }, 2000);
      } else {
        setStatus("failed");
        setMessage(msg || "Face does not match. Please try again.");
      }
    } catch (err) {
      const detail = err.response?.data?.detail || "Verification failed. Please try again.";
      if (detail.toLowerCase().includes("no registered face")) {
        setStatus("error");
        setMessage("No face registered. Redirecting to face registration...");
        setTimeout(() => navigate("/RegisterFace"), 2000);
      } else {
        setStatus("error");
        setMessage(detail);
      }
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setMessage("Click 'Start Camera' to begin face verification.");
    setConfidence(null);
    setMethod(null);
    setPredictedId(null);
  };

  const confPct = confidence !== null ? Math.round(confidence * 100) : null;

  const methodLabel = method === "pca_svm"
    ? "PCA + SVM"
    : method === "pca_cosine_similarity"
    ? "PCA + Cosine Similarity"
    : null;

  const methodColor = method === "pca_svm" ? "#6366f1" : "#0ea5e9";

  return (
    <main className="sv-page sv-page-center">
      <section className="sv-verify-card">
        <div className="sv-verify-header">
          <span className="sv-verify-icon">📸</span>
          <h1>Face Verification</h1>
          <p>PCA + SVM identity recognition</p>
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

        {/* ML result panel — only shown after a verification attempt */}
        {confPct !== null && (
          <div style={{
            margin: "12px 0",
            padding: "12px 16px",
            background: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "0.85rem",
          }}>
            {/* Method badge */}
            {methodLabel && (
              <div style={{ marginBottom: "8px" }}>
                <span style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: "99px",
                  background: methodColor,
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                }}>
                  {methodLabel}
                </span>
              </div>
            )}

            {/* Confidence bar */}
            <div style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#475569" }}>Confidence</span>
                <strong style={{ color: confPct >= 50 ? "#16a34a" : "#dc2626" }}>
                  {confPct}%
                </strong>
              </div>
              <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${confPct}%`,
                  background: confPct >= 50 ? "#16a34a" : "#dc2626",
                  borderRadius: "99px",
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            {/* Predicted ID (SVM only) */}
            {predictedId && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <span style={{ color: "#475569" }}>Predicted ID</span>
                <strong style={{ color: "#1e293b", fontFamily: "monospace" }}>{predictedId}</strong>
              </div>
            )}
          </div>
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