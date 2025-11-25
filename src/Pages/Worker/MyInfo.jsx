import React, { useEffect, useState } from "react";
import "./MyInfo.css";
import { images } from "../../assets/image.jsx";
import { getMyProfile, updateMyProfile } from "../../api/userApi";

export default function MyInfo() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", 
  });

  const [loading, setLoading] = useState(false);   
  const [saving, setSaving] = useState(false);     
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const profile = await getMyProfile();

        setForm({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || "",
          password: "", 
        });
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        passwordHash: form.password || undefined,
      };

      await updateMyProfile(payload);
      setSuccess("Profile updated successfully");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="worker-myinfo">
      <h1 className="info-title">My Info</h1>

      <form className="info-form" onSubmit={handleSubmit}>
        <div className="info-avatar">
          <img src={images.workerAvatar} alt="Avatar" className="avatar-img" />
          <p className="edit-label">Edit</p>
        </div>

        <div className="info-fields">
          {loading && <p className="info-status">Loading...</p>}
          {error && <p className="info-error">{error}</p>}
          {success && <p className="info-success">{success}</p>}

          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={form.firstName}
            onChange={handleChange}
            disabled={loading || saving}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={form.lastName}
            onChange={handleChange}
            disabled={loading || saving}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            disabled={loading || saving}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            disabled={loading || saving}
          />

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || saving}
          >
            {saving ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
