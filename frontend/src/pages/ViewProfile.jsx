// src/pages/ViewProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewProfilePage.css";
import "./AddressPage.css";

function ViewProfilePage() {
  const [address, setAddress] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        // Fetch user details
        const userRes = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }

        // Fetch address details
        const addrRes = await fetch("http://127.0.0.1:8000/api/addresses/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (addrRes.ok) {
          const addrData = await addrRes.json();
          if (addrData.length > 0) setAddress(addrData[0]);
          else navigate("/addresses");
        }
      } catch (err) {
        console.error("Error fetching profile or address", err);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  if (!user || !address) return <p className="loading-text">Loading your profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-banner">
          <h2 className="banner-title">User Details</h2>
          <div className="banner-actions">
            <button className="btn-primary" onClick={() => navigate("/addresses")}>
              Edit Details
            </button>
          </div>
        </div>

        <div className="profile-content">
          {/* Personal Details card */}
          <div className="profile-card">
            <div className="profile-header">
              <h2>Personal Details</h2>
              <div className="header-actions">
                <button
                  className="btn-outline"
                  onClick={() => navigate("/changepassword")}
                >
                  Change Password
                </button>
                <button
                  className="btn-danger"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="profile-grid">
              <div>
                <label>Name</label>
                <input type="text" value={user.name || ""} readOnly />
              </div>
              <div>
                <label>Phone Number</label>
                <input type="text" value={user.phone || ""} readOnly />
              </div>
              <div>
                <label>Email</label>
                <input type="text" value={user.email || ""} readOnly />
              </div>
            </div>
          </div>

          {/* Address Details card */}
          <div className="profile-card">
            <div className="profile-header">
              <h2>Address Details</h2>
            </div>

            <div className="profile-grid">
              <div>
                <label>House/Flat.No</label>
                <input type="text" value={address.house_no || ""} readOnly />
              </div>
              <div>
                <label>Street</label>
                <input type="text" value={address.street || ""} readOnly />
              </div>
              <div>
                <label>Landmark</label>
                <input type="text" value={address.landmark || ""} readOnly />
              </div>

              {/* second row */}
              <div>
                <label>Area</label>
                <input type="text" value={address.area || ""} readOnly />
              </div>
              <div>
                <label>District</label>
                <input type="text" value={address.district || ""} readOnly />
              </div>
              <div>
                <label>State</label>
                <input type="text" value={address.state || ""} readOnly />
              </div>

              {/* third row */}
              <div>
                <label>Country</label>
                <input type="text" value={address.country || ""} readOnly />
              </div>
              <div>
                <label>Pincode</label>
                <input type="text" value={address.pincode || ""} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfilePage;
