// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddressPage from "./pages/AddressPage";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ViewProfile from "./pages/ViewProfile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  console.log("✅ App loaded");

  return (
    <Routes>
      {/* Default route: redirect to /login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Protected pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addresses"
        element={
          <ProtectedRoute>
            <AddressPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewprofile"
        element={
          <ProtectedRoute>
            <ViewProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/changepassword"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
const api = axios.create({
  baseURL: 'https://login1-ta49.onrender.com', // ← backend URL
});

export default App;
