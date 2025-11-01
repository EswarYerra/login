import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, phone, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setSuccess(" User registered successfully!");
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
    } else {
      setError(data.detail || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create Account</h1>
      <p className="register-subtitle">Join us by filling out the details below</p>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="register-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          required
        />

        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}

        <button type="submit" className="register-button">
          Create Account
        </button>
      </form>

      <p className="login-redirect">
        Already have an account?
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}


