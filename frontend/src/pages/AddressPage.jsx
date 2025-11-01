import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddressPage.css";

function AddressPage() {
  const [form, setForm] = useState({
    flat_no: "",
    street: "",
    landmark: "",
    area: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Auto-detect City/State/Country from postal code
  const handlePostalCodeChange = async (e) => {
    const postal_code = e.target.value;
    setForm({ ...form, postal_code });

    if (postal_code.length < 5) return;

    try {
      const indianRes = await fetch(
        `https://api.postalpincode.in/pincode/${postal_code}`
      );
      const indianData = await indianRes.json();

      if (indianData[0]?.Status === "Success") {
        const info = indianData[0].PostOffice[0];
        setForm((prev) => ({
          ...prev,
          postal_code,
          city: info.District,
          state: info.State,
          country: "India",
        }));
        return;
      }

      const countryCode = form.country?.toLowerCase() || "us";
      const res = await fetch(
        `https://api.zippopotam.us/${countryCode}/${postal_code}`
      );
      if (res.ok) {
        const data = await res.json();
        const place = data.places[0];
        setForm((prev) => ({
          ...prev,
          postal_code,
          city: place["place name"],
          state: place["state"],
          country: data["country"],
        }));
      } else {
        console.warn("Invalid or unsupported postal code");
      }
    } catch (err) {
      console.error("Postal lookup failed:", err);
    }
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        street: `${form.flat_no}, ${form.street}, ${form.landmark}, ${form.area}`,
        city: form.city,
        state: form.state,
        postal_code: form.postal_code,
        country: form.country,
      };

      const res = await fetch("http://127.0.0.1:8000/api/addresses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add address");

      setSuccess("✅ Address added successfully!");
      setForm({
        flat_no: "",
        street: "",
        landmark: "",
        area: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="address-container">
      <h2 className="address-title">Add Address</h2>

      {error && <p className="address-error">{error}</p>}
      {success && <p className="address-success">{success}</p>}

      <form onSubmit={handleSubmit} className="address-form">
        <input
          type="text"
          placeholder="Flat / House No."
          value={form.flat_no}
          onChange={(e) => setForm({ ...form, flat_no: e.target.value })}
          className="address-input"
          required
        />
        <input
          type="text"
          placeholder="Street"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
          className="address-input"
          required
        />
        <input
          type="text"
          placeholder="Landmark"
          value={form.landmark}
          onChange={(e) => setForm({ ...form, landmark: e.target.value })}
          className="address-input"
        />
        <input
          type="text"
          placeholder="Area / Locality"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          className="address-input"
        />
        <input
          type="text"
          placeholder="Pincode / Postal Code"
          value={form.postal_code}
          onChange={handlePostalCodeChange}
          className="address-input"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="address-input"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          className="address-input"
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="address-input"
          required
        />

        <button type="submit" className="address-button">
          Save Address
        </button>
      </form>
    </div>
  );
}



export default AddressPage;
