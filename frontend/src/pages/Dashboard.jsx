import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.username) {
            setUser(data);
            setShowPopup(false);
          } else {
            setShowPopup(true);
          }
        } else {
          setShowPopup(true);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setShowPopup(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  // Handle new user details submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setShowPopup(false);
      } else {
        console.error("Failed to save details");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
      <p className="dashboard-subtitle">Manage your profile & account info</p>

      {/* Popup for missing details */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Enter Personal Details</h3>
            <form onSubmit={handleSubmit} className="popup-form">
              <input
                type="text"
                placeholder="Full Name"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <button type="submit" className="popup-save-btn">
                Save Details
              </button>
            </form>
          </div>
        </div>
      )}

      {!showPopup && user && (
        <div className="profile-section">
          <h2 className="section-title">👤 Personal Details</h2>
          <div className="profile-info">
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>

          <div className="dashboard-actions">
            <button onClick={() => navigate("/viewprofile")} className="dashboard-button">
              Edit Details
            </button>
            <button onClick={() => navigate("/changepassword")} className="dashboard-button">
              Change Password
            </button>
            <button onClick={handleLogout} className="dashboard-button logout">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
