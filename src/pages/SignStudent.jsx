import React, { useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import SplashAnimation from "../assets/splash.json"; 
import CapsortImage from "../assets/capsort.png";     
import backIcon from "../assets/back.png";

import mailIcon from "../assets/mail.png";
import passIcon from "../assets/pass.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

import "../styles/SignStudent.css"; // merged CSS

export default function SignTabs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  // New states to track inputs for each tab
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const isStudentButtonDisabled = !studentEmail || !studentPassword;
  const isAdminButtonDisabled = !adminEmail || !adminPassword;

  return (
    <div className="signup-container">
      {/* Back Button */}
      <div className="signup-back-button" onClick={() => navigate("/splash")}>
        <img src={backIcon} alt="Back" className="signup-back-icon" />
      </div>

      {/* Left Form / Scroll */}
      <div className="signup-scroll-container">
        <img src={CapsortImage} alt="Capsort Logo" className="signup-logo" />
        <h2 className="signup-title">Capstone Archiving and Sorting System</h2>

        <div className="signup-tab-container">
  <div
    className="signup-tab-background"
    style={{ left: activeTab === "student" ? "0%" : "50%" }}
  />
  <div
    className={`signup-tab-button ${activeTab === "student" ? "active" : ""}`}
    onClick={() => setActiveTab("student")}
  >
    Student
  </div>
  <div
    className={`signup-tab-button ${activeTab === "admin" ? "active" : ""}`}
    onClick={() => setActiveTab("admin")}
  >
    Admin
  </div>
</div>


        {/* Form */}
        <form className="signup-form">
          <div className="signup-input-wrapper">
            <img src={mailIcon} alt="Mail" className="signup-icon" />
            <input
              type="email"
              placeholder="Email Address"
              className="signup-input"
              value={activeTab === "student" ? studentEmail : adminEmail}
              onChange={(e) => 
                activeTab === "student"
                  ? setStudentEmail(e.target.value)
                  : setAdminEmail(e.target.value)
              }
            />
          </div>

          <div className="signup-input-wrapper">
            <img src={passIcon} alt="Password" className="signup-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="signup-input"
              value={activeTab === "student" ? studentPassword : adminPassword}
              onChange={(e) => 
                activeTab === "student"
                  ? setStudentPassword(e.target.value)
                  : setAdminPassword(e.target.value)
              }
            />
            <img
              src={showPassword ? showIcon : hideIcon}
              alt="Toggle Password"
              className="signup-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="signup-checkbox-wrapper">
            <div className="signup-remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="signup-checkbox"
              />
              <label className="signup-label">Remember Me</label>
            </div>
            {activeTab === "student" && (
              <span
                className="signup-forgot-password"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot Password?
              </span>
            )}
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={activeTab === "student" ? isStudentButtonDisabled : isAdminButtonDisabled}
            style={{
              cursor: (activeTab === "student" ? isStudentButtonDisabled : isAdminButtonDisabled) ? "not-allowed" : "pointer",
              opacity: (activeTab === "student" ? isStudentButtonDisabled : isAdminButtonDisabled) ? 0.6 : 1
            }}
          >
            Sign in
          </button>
        </form>

        {activeTab === "admin" && (
          <div className="signup-admin-note">
            Admin access is restricted. Only authorized personnel can log in.
          </div>
        )}
        {activeTab === "student" && (
          <div className="signup-redirect">
            Don't have an account?{" "}
            <span
              className="signup-redirect-link"
              onClick={() => navigate("/signup")}
            >
              Sign up here.
            </span>
          </div>
        )}
      </div>

      {/* Right Lottie Animation */}
      <div className="signup-lottie-container">
        <Lottie animationData={SplashAnimation} loop={true} className="signup-lottie-animation" />
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Forgot Password</h3>
            <p className="modal-text">
              Enter your email address below to receive a password reset link.
            </p>
            <div className="signup-input-wrapper">
              <img src={mailIcon} alt="Mail" className="signup-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="signup-input"
              />
            </div>
            <div className="modal-buttons">
              <button
                className="modal-send-link"
                onClick={() => {
                  alert(`Reset link sent to ${forgotEmail}`);
                  setShowForgotModal(false);
                }}
              >
                Send Reset Link
              </button>
              <button
                className="modal-cancel"
                onClick={() => setShowForgotModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
