import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function FaceVerification() {
  const videoRef  = useRef(null);
  const streamRef = useRef(null);
  const navigate  = useNavigate();

  const [status,  setStatus]  = useState("idle");
  const [message, setMessage] = useState("Checking enrollment status...");
  const [mode,    setMode]    = useState(null);

  useEffect(() => {
    api.get("/face/status/")
      .then(res => {
        if (res.data.enrolled) {
          setMode("verify");
          setMessage("Face enrolled. Click Start Camera to verify your identity.");
        } else {
          setMode("enroll");
          setMessage("No face enrolled yet. Click Start Camera to enroll your face first.");
        }
      })
      .catch(() => {
        setMode("verify");
        setMessage("Click Start Camera to begin face verification.");
      });
    return () => stopCamera();
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 360 }
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStatus("streaming");
      setMessage(
        mode === "enroll"
          ? "Position your face clearly, then click Enroll Face."
          : "Position your face, then click Verify Identity."
      );
    } catch {
      setStatus("error");
      setMessage("Camera access denied. Please allow camera permissions.");
    }
  };

  const captureFrame = () => {
    return new Promise((resolve, reject) => {
      const video = videoRef.current;
      if (!video || video.videoWidth === 0) return reject("Camera not ready");
      const canvas = document.createElement("canvas");
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      canvas.toBlob(
        blob => blob ? resolve(blob) : reject("Capture failed"),
        "image/jpeg", 0.92
      );
    });
  };

  const handleAction = async () => {
    setStatus("capturing");
    setMessage("Capturing frame...");
    try {
      const blob = await captureFrame();
      stopCamera();

      const fd = new FormData();
      fd.append("photo", blob, "face.jpg");

      if (mode === "enroll") {
        setStatus("enrolling");
        setMessage("Enrolling your face... please wait.");
        await api.post("/face/enroll/", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setMode("verify");
        setStatus("idle");
        setMessage("Face enrolled! Now click Start Camera to verify your identity.");
      } else {
        setStatus("verifying");
        setMessage("Verifying your identity...");
        const res = await api.post("/face/verify/", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data.verified) {
          setStatus("success");
          setMessage("Identity verified! (" + res.data.confidence + "%) Redirecting...");
          const role = localStorage.getItem("userRole");
          setTimeout(() => navigate(role === "admin" ? "/Dashboard" : "/StudentDashboard"), 1200);
        } else {
          setStatus("error");
          setMessage("Not recognized (" + res.data.confidence + "% match). Please try again.");
        }
      }
    } catch (err) {
      const detail = err.response && err.response.data && err.response.data.detail
        ? err.response.data.detail
        : "Failed. Please try again.";
      setStatus("error");
      setMessage(detail);
    }
  };

  return (
    <main className="sv-page sv-page-center">
      <section className="sv-verify-card">
        <div className="sv-verify-header">
          <h1>Face Verification</h1>
          <p>{mode === "enroll" ? "First, enroll your face to enable biometric login" : "Confirm your identity to proceed"}</p>
        </div>

        <div className="sv-camera-wrapper">
          <video ref={videoRef} autoPlay playsInline muted className="sv-camera-feed" style={{ transform: "scaleX(-1)" }} />
          {(status === "idle" || status === "error") && (
            <div className="sv-camera-overlay">
              <p>Camera Off</p>
            </div>
          )}
          {(status === "capturing" || status === "enrolling" || status === "verifying") && (
            <div className="sv-camera-overlay sv-camera-scanning">
              <p>{status === "enrolling" ? "Enrolling..." : "Scanning..."}</p>
            </div>
          )}
          {status === "success" && (
            <div className="sv-camera-overlay sv-camera-success">
              <p>Verified!</p>
            </div>
          )}
        </div>

        <p className={"sv-verify-message sv-verify-" + status}>{message}</p>

        <div className="sv-verify-actions">
          {(status === "idle" || status === "error") && mode && (
            <button className="sv-btn sv-btn-primary" onClick={startCamera}>
              Start Camera
            </button>
          )}
          {status === "streaming" && (
            <button className="sv-btn sv-btn-primary" onClick={handleAction}>
              {mode === "enroll" ? "Enroll Face" : "Verify Identity"}
            </button>
          )}
          {(status === "capturing" || status === "enrolling" || status === "verifying") && (
            <button className="sv-btn sv-btn-primary" disabled>Processing...</button>
          )}
        </div>
      </section>
    </main>
  );
}

export default FaceVerification;
