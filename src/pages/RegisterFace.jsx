import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function RegisterFace() {
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const navigate  = useNavigate();

  const [status,   setStatus]   = useState("idle");
  const [message,  setMessage]  = useState("Click 'Start Camera' to register your face.");
  const [preview,  setPreview]  = useState(null);
  const [dots,     setDots]     = useState("");

  // Animate dots during upload
  useEffect(() => {
    if (status !== "uploading") return;
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 500);
    return () => clearInterval(t);
  }, [status]);

  const startCamera = async () => {
    setPreview(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });
      videoRef.current.srcObject = stream;
      setStatus("streaming");
      setMessage("Position your face clearly in the frame, then click Capture Photo.");
    } catch {
      setStatus("error");
      setMessage("Camera access denied. Please allow camera permissions and try again.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((t) => t.stop());
  };

  const capturePhoto = () => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageBase64 = canvas.toDataURL("image/jpeg", 0.9);
    setPreview(imageBase64);
    stopCamera();
    setStatus("captured");
    setMessage("Photo captured! Click 'Register Face' to save, or retake.");
    return imageBase64;
  };

  const handleRegister = async () => {
    if (!preview) return;
    setStatus("uploading");
    setMessage("Registering your face");

    try {
      await api.post("/face/register-face/", { image: preview });
      setStatus("success");
      setMessage("Face registered successfully! Redirecting to verification...");
      setTimeout(() => navigate("/FaceVerification"), 1500);
    } catch (err) {
      const detail = err.response?.data?.detail || "Registration failed. Please try again.";
      setStatus("error");
      setMessage(detail);
    }
  };

  const handleRetake = () => {
    setPreview(null);
    setStatus("idle");
    setMessage("Click 'Start Camera' to register your face.");
  };

  return (
    <main className="sv-page sv-page-center">
      <section className="sv-verify-card">
        <div className="sv-verify-header">
          <span className="sv-verify-icon">🪪</span>
          <h1>Register Your Face</h1>
          <p>Take a photo to enroll your face for identity verification</p>
        </div>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="sv-camera-wrapper">
          {/* Show preview image after capture, otherwise show video */}
          {preview ? (
            <img
              src={preview}
              alt="Captured face"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
            />
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="sv-camera-feed" />
          )}

          {status === "idle" && (
            <div className="sv-camera-overlay">
              <span>📷</span><p>Camera Off</p>
            </div>
          )}
          {status === "uploading" && (
            <div className="sv-camera-overlay sv-camera-scanning">
              <span>⬆️</span><p>Uploading{dots}</p>
            </div>
          )}
          {status === "success" && (
            <div className="sv-camera-overlay sv-camera-success">
              <span>✅</span><p>Registered!</p>
            </div>
          )}
          {status === "error" && (
            <div className="sv-camera-overlay" style={{ background: "rgba(220,38,38,0.7)" }}>
              <span>❌</span><p>Failed</p>
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
            <button className="sv-btn sv-btn-primary" onClick={capturePhoto}>
              Capture Photo
            </button>
          )}
          {status === "captured" && (
            <>
              <button className="sv-btn sv-btn-primary" onClick={handleRegister}>
                Register Face
              </button>
              <button className="sv-btn sv-btn-outline" onClick={handleRetake}
                style={{ marginLeft: "8px" }}>
                Retake
              </button>
            </>
          )}
          {(status === "error") && (
            <button className="sv-btn sv-btn-outline" onClick={handleRetake}>
              Try Again
            </button>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#64748b", marginTop: "16px" }}>
          Make sure your face is well-lit and clearly visible.
        </p>
      </section>
    </main>
  );
}

export default RegisterFace;
