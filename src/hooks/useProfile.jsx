import { useState, useEffect } from "react";
import api from "../api";

function useProfile() {
  const [profile, setProfile]   = useState({
    full_name: "", student_id: "", email: "", course: "", year_level: "",
  });
  const [form, setForm]         = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get("/auth/profile/")
      .then((res) => {
        setProfile(res.data);
        setForm(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/auth/profile/", {
        full_name:  form.full_name,
        email:      form.email,
        course:     form.course,
        year_level: form.year_level,
      });
      setProfile(res.data);
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to update profile.");
    }
  };

  const handleEdit   = () => { setForm({ ...profile }); setIsEditing(true); };
  const handleCancel = () => { setForm({ ...profile }); setIsEditing(false); };

  return { profile, form, isEditing, saved, loading, handleChange, handleSave, handleEdit, handleCancel };
}

export default useProfile;
