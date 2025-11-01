import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [form, setForm] = useState({
    username: "",
    old_password: "",
    new_password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/change-password/", form);
      setSuccess(res.data.detail);
      // Navigate back to profile after successful password change
      setTimeout(() => navigate("/viewprofile"), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={form.username}
          onChange={handleChange}
          className="change-password-input"
          required
        />
        <input
          type="password"
          name="old_password"
          placeholder="Old password"
          value={form.old_password}
          onChange={handleChange}
          className="change-password-input"
          required
        />
        <input
          type="password"
          name="new_password"
          placeholder="New password"
          value={form.new_password}
          onChange={handleChange}
          className="change-password-input"
          required
        />
        <button type="submit" className="change-password-button">
          Update Password
        </button>
      </form>

      {success && <p className="change-password-success">{success}</p>}
      {error && <p className="change-password-error">{error}</p>}

      <p className="back-to-profile">
        <Link to="/viewprofile">Back to Profile</Link>
      </p>
    </div>
  );
}
