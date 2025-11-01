import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError("Login failed: " + (data.detail || "Unknown error"));
        return;
      }

      const token = data.access;
      localStorage.setItem("access", token);
      localStorage.setItem("refresh", data.refresh);

      // ✅ Check if user already has an address
      const checkResponse = await fetch("http://127.0.0.1:8000/api/addresses/check/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const checkData = await checkResponse.json();

      if (checkResponse.ok && checkData.has_address) {
  navigate("/dashboard"); // show dashboard first
} else {
  navigate("/addresses"); // ask to add address if missing
}

    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="login-error">{error}</p>}
        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      <div className="login-links">
        <p>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
