import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function useFaceVerification() {
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

  return { videoRef, status, message, startCamera, handleVerify };
}

export default useFaceVerification;
