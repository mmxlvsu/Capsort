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

import "../styles/SignAdmin.css";

export default function SignAdmin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="signadmin-container">
      {/* Back Button */}
      <div className="signadmin-back-button" onClick={() => navigate("/splash")}>
        <img src={backIcon} alt="Back" />
      </div>

      {/* Scroll / Form Container */}
      <div className="signadmin-scroll-container">
        <img src={CapsortImage} alt="Capsort Logo" className="signadmin-logo" />
        <h2 className="signadmin-title">Capstone Archiving and Sorting System</h2>

        {/* Tabs */}
        <div className="signadmin-tab-container">
          <div className="signadmin-tab inactive" onClick={() => navigate("/signstudent")}>
            Student
          </div>
          <div className="signadmin-tab active">Admin</div>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col items-center">
          {/* Email */}
          <div className="signadmin-input-container">
            <img src={mailIcon} alt="Mail" className="signadmin-icon" />
            <input type="email" placeholder="Email Address" className="signadmin-input" />
          </div>

          {/* Password */}
          <div className="signadmin-input-container">
            <img src={passIcon} alt="Password" className="signadmin-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="signadmin-input"
            />
            <img
              src={showPassword ? showIcon : hideIcon}
              alt="Toggle Password"
              className="signadmin-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Remember Me */}
          <div className="signadmin-remember-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="rememberMe"
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          {/* Login Button */}
          <button type="submit" className="signadmin-button">
            Log In
          </button>
        </form>

        {/* Admin Note */}
        <div className="signadmin-note">
          <p>
            Admin access is restricted. Only authorized personnel with valid credentials can login.
          </p>
        </div>

        {/* Redirect to Signup */}
        <div className="signadmin-redirect">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Sign up here.
          </span>
        </div>
      </div>

      {/* Lottie Animation */}
      <div className="signadmin-lottie-container">
        <Lottie animationData={SplashAnimation} loop={true} className="signadmin-lottie" />
      </div>
    </div>
  );
}
