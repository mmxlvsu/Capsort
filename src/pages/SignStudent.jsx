import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import SplashAnimation from "../assets/splash.json"; 
import CapsortImage from "../assets/capsort.png";     
import backIcon from "../assets/back.png";

import mailIcon from "../assets/mail.png";
import passIcon from "../assets/pass.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

import "../styles/SignStudent.css";

export default function SignStudent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  return (
    <div className="signup-container">
      
      {/* Back Button */}
      <div className="signup-back-button" onClick={() => navigate("/splash")}>
        <img src={backIcon} alt="Back" className="signup-back-icon" />
      </div>

      {/* Left Scroll / Form */}
      <div className="signup-scroll-container">
        <img src={CapsortImage} alt="Capsort Logo" className="signup-logo" />
        <h2 className="signup-title">Capstone Archiving and Sorting System</h2>

        {/* Tabs */}
        <div className="signup-tab-container">
          <div className="signup-tab signup-tab-student active">Student</div>
          <div
            className="signup-tab signup-tab-admin"
            onClick={() => navigate("/signadmin")}
          >
            Admin
          </div>
        </div>

        <form className="signup-form">
          {/* Email */}
          <div className="signup-input-wrapper">
            <img src={mailIcon} alt="Mail" className="signup-icon signup-icon-mail" />
            <input type="email" placeholder="Email Address" className="signup-input signup-input-email" />
          </div>

          {/* Password */}
          <div className="signup-input-wrapper">
            <img src={passIcon} alt="Password" className="signup-icon signup-icon-pass" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="signup-input signup-input-password"
            />
            <img
              src={showPassword ? showIcon : hideIcon}
              alt="Toggle Password"
              className="signup-toggle-icon signup-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Remember Me + Forgot Password */}
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
            <span className="signup-forgot-password" onClick={() => setShowForgotModal(true)}>
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button type="submit" className="signup-button signup-login-button">
            Log In
          </button>
        </form>

        {/* Redirect to Signup */}
        <div className="signup-redirect">
          Don't have an account?{" "}
          <span className="signup-redirect-link" onClick={() => navigate("/signup")}>
            Sign up here.
          </span>
        </div>
      </div>

      {/* Right Lottie Animation */}
      <div className="signup-lottie-container">
        <Lottie animationData={SplashAnimation} loop={true} className="signup-lottie-animation" />
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay modal-forgot-password">
          <div className="modal-content modal-forgot-password-content">
            <h3 className="modal-title">Forgot Password</h3>
            <p className="modal-text">
              Enter your email address below to receive a password reset link.
            </p>
            <div className="signup-input-wrapper modal-input-wrapper">
              <img src={mailIcon} alt="Mail" className="signup-icon signup-icon-mail" />
              <input
                type="email"
                placeholder="Email Address"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="signup-input signup-input-email"
              />
            </div>
            <div className="modal-buttons modal-forgot-buttons">
              <button
                className="modal-button modal-send-link"
                onClick={() => {
                  alert(`Reset link sent to ${forgotEmail}`);
                  setShowForgotModal(false);
                }}
              >
                Send Reset Link
              </button>
              <button
                className="modal-button modal-cancel"
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
