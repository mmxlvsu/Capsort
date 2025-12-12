import { useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import SplashAnimation from "../assets/splash.json"; 
import CapsortImage from "../assets/capsort.png";     
import backIcon from "../assets/back.png";
import passIcon from "../assets/pass.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

import "../styles/SignStudent.css";

export default function SignUp() {
  const navigate = useNavigate();

  // States for new password fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = !newPassword || !confirmPassword || newPassword !== confirmPassword || loading;

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Reset password:", newPassword);
    setLoading(false);
  };

  return (
    <div className="signup-container">
      {/* Back Button */}
      <div className="signup-back-button" onClick={() => navigate("/splash")}>
        <img src={backIcon} alt="Back" className="signup-back-icon" />
      </div>

      {/* Left Side */}
      <div className="signup-scroll-container">
        <img src={CapsortImage} alt="Capsort Logo" className="signup-logo" />
        <h2 className="signup-title">Capstone Archiving and Sorting System</h2>

        <form className="signup-new-password-form">
  {/* Create New Password */}
  <div className="signup-new-password-container">
    <img src={passIcon} alt="New Password" className="signup-new-password-icon" />
    <input
      type={showNewPassword ? "text" : "password"}
      placeholder="Create New Password"
      className="signup-new-password-input"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <img
      src={showNewPassword ? showIcon : hideIcon}
      alt="Toggle Password"
      className="signup-new-password-toggle"
      onClick={() => setShowNewPassword(!showNewPassword)}
    />
  </div>
  {/* Note for new password */}
  <p className="signup-password-firstnote" style={{ color: "#555" }}>
    Password must be 8-16 characters
  </p>

  {/* Confirm New Password */}
  <div className="signup-confirm-password-container">
    <img src={passIcon} alt="Confirm Password" className="signup-confirm-password-icon" />
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm New Password"
      className="signup-confirm-password-input"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
    <img
      src={showConfirmPassword ? showIcon : hideIcon}
      alt="Toggle Confirm Password"
      className="signup-confirm-password-toggle"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    />
  </div>
  {/* Note for password match */}
  <p className="signup-password-note">
    Password must match
    {newPassword && confirmPassword && newPassword !== confirmPassword && (
      <span style={{ color: "red" }}> — Passwords do not match</span>
    )}
  </p>

  <button
    className="signup-reset-button"
    onClick={handleResetPassword}
    disabled={isButtonDisabled}
    style={{
      cursor: isButtonDisabled ? "not-allowed" : "pointer",
      opacity: isButtonDisabled ? 0.6 : 1
    }}
  >
    {loading ? "Resetting..." : "Reset Password"}
  </button>
</form>
      </div>

      {/* Right Lottie Animation */}
      <div className="signup-lottie-container">
        <Lottie 
          animationData={SplashAnimation} 
          loop={true} 
          className="signup-lottie-animation" 
        />
      </div>
    </div>
  );
}
