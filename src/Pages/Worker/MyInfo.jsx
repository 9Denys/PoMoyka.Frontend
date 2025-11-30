import React, { useEffect, useState, useRef } from "react";
import "./MyInfo.css";
import { images } from "../../assets/image.jsx";
import {
  getMyProfile,
  updateMyProfile,
  getUserImageUrl,
  uploadUserImage,
  deleteUserImage,
} from "../../api/userApi";

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

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [profile, imageData] = await Promise.all([
          getMyProfile(),
          getUserImageUrl().catch(() => null),
        ]);

        setForm({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || "",
          password: "",
        });

        if (imageData) {
          const url =
            typeof imageData === "string"
              ? imageData.trim()
              : imageData.imageUrl || imageData.url || "";

          if (url) setAvatarUrl(url);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setSuccess("");
    setAvatarLoading(true);

    const localUrl = URL.createObjectURL(file);
    setAvatarUrl(localUrl);

    try {
      await uploadUserImage(file);

      const imageData = await getUserImageUrl().catch(() => null);

      if (imageData) {
        const url =
          typeof imageData === "string"
            ? imageData.trim()
            : imageData.imageUrl || imageData.url || "";

        if (url) setAvatarUrl(url);
      }

      setSuccess("Avatar updated successfully");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to upload image");
    } finally {
      setAvatarLoading(false);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async () => {
    setError("");
    setSuccess("");
    setAvatarLoading(true);

    try {
      await deleteUserImage();
      setAvatarUrl(null);
      setSuccess("Avatar deleted successfully");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete image");
    } finally {
      setAvatarLoading(false);
    }
  };

  return (
    <div className="worker-myinfo">
      <h1 className="info-title">My Info</h1>

      <form className="info-form" onSubmit={handleSubmit}>
       
        <div className="info-avatar">
          <img
            src={avatarUrl || images.workerAvatar}
            alt="Avatar"
            className="avatar-img"
            onClick={handleAvatarClick}
            style={{ cursor: "pointer" }}
          />

          <p className="edit-label" onClick={handleAvatarClick}>
            {avatarLoading ? "Uploading..." : "Edit"}
          </p>

         {/*  {avatarUrl && (
            <button
              type="button"
              className="delete-photo-btn"
              onClick={handleDeleteImage}
              disabled={avatarLoading || loading || saving}
            >
              Delete photo 
            </button>
          )} */}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
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
