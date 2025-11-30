import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import { authService } from "../services/auth";

import SplashAnimation from "../assets/splash.json";
import CapsortImage from "../assets/capsort.png";
import backIcon from "../assets/back.png";
import passIcon from "../assets/pass.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

import "../styles/SignStudent.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    // Validate password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const result = await authService.resetPassword(token, newPassword);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/signstudent");
        }, 2000);
      } else {
        setError(result.error || "Failed to reset password");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !newPassword || !confirmPassword || loading || !token;

  return (
    <div className="signup-container">
      <div className="signup-back-button" onClick={() => navigate("/signstudent")}>
        <img src={backIcon} alt="Back" className="signup-back-icon" />
      </div>

      <div className="signup-scroll-container">
        <img src={CapsortImage} alt="Capsort Logo" className="signup-logo" />
        <h2 className="signup-title">Reset Your Password</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          Enter your new password below
        </p>

        {error && (
          <div style={{ 
            color: 'red', 
            padding: '10px', 
            marginBottom: '10px', 
            backgroundColor: '#ffe6e6',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            color: 'green', 
            padding: '10px', 
            marginBottom: '10px', 
            backgroundColor: '#e6ffe6',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            Password reset successful! Redirecting to login...
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input-wrapper">
            <img src={passIcon} alt="Password" className="signup-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="signup-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading || success}
            />
            <img
              src={showPassword ? showIcon : hideIcon}
              alt="Toggle Password"
              className="signup-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="signup-input-wrapper">
            <img src={passIcon} alt="Password" className="signup-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className="signup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading || success}
            />
            <img
              src={showConfirmPassword ? showIcon : hideIcon}
              alt="Toggle Password"
              className="signup-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
            Password must contain:
            <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
              <li>At least 6 characters</li>
              <li>One lowercase letter</li>
              <li>One uppercase letter</li>
              <li>One number</li>
            </ul>
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={isButtonDisabled || success}
            style={{
              cursor: (isButtonDisabled || success) ? "not-allowed" : "pointer",
              opacity: (isButtonDisabled || success) ? 0.6 : 1
            }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="signup-redirect">
          Remember your password?{" "}
          <span
            className="signup-redirect-link"
            onClick={() => navigate("/signstudent")}
          >
            Sign in here.
          </span>
        </div>
      </div>

      <div className="signup-lottie-container">
        <Lottie animationData={SplashAnimation} loop={true} className="signup-lottie-animation" />
      </div>
    </div>
  );
}
