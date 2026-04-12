import { useState, useEffect } from "react";
import api from "../api";

function useElectionSettings() {
  const [settings, setSettings] = useState({
    title: "", start_date: "", end_date: "",
    status: "upcoming", allow_multiple_votes: false, require_face_verification: true,
  });
  const [saved, setSaved]     = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/election-settings/")
      .then((res) => setSettings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put("/election-settings/", settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save settings.");
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = settings.status === "open" ? "closed" : "open";
    try {
      await api.put("/election-settings/", { status: newStatus });
      setSettings((prev) => ({ ...prev, status: newStatus }));
    } catch {
      alert("Failed to update status.");
    }
  };

  return { settings, saved, loading, handleChange, handleSave, handleToggleStatus };
}

export default useElectionSettings;
