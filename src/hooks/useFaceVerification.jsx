import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

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

  const handleVerify = async () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) {
      setStatus("error");
      setMessage("Camera not ready. Please start the camera first.");
      return;
    }

    setStatus("verifying");
    setMessage("Scanning your face...");

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setStatus("error");
        setMessage("Failed to capture image. Please try again.");
        return;
      }
      const formData = new FormData();
      formData.append("photo", blob, "frame.jpg");
      try {
        const res = await api.post("/face/verify/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.verified) {
          setStatus("success");
          setMessage(`Verified! ${res.data.confidence}% confidence. Redirecting...`);
          if (stream) stream.getTracks().forEach((track) => track.stop());
          setTimeout(() => {
            navigate(role === "admin" ? "/Dashboard" : "/StudentDashboard");
          }, 1500);
        } else {
          setStatus("error");
          setMessage(`Not recognized (${res.data.confidence}% match). Please try again.`);
        }
      } catch (err) {
        const detail = err.response?.data?.detail || "Verification failed. Please try again.";
        setStatus("error");
        setMessage(detail);
      }
    }, "image/jpeg");
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