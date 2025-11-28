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

export default function SignAdmin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const lottieContainerStyles = {
    position: "relative",
    top: "0px",
    left: "0px",
    width: "440px",
    height: "440px",
    backgroundColor: "rgba(26, 24, 81, 0.98)",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const lottieStyles = { width: "80%", height: "80%" };

  const scrollContainerStyles = {
    width: lottieContainerStyles.width,
    height: lottieContainerStyles.height,
    borderRadius: "12px",
    overflowY: "auto",
    padding: "20px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const capsortStyles = { width: "180px", height: "auto", marginBottom: "-4px", marginTop: "10px" };

  const titleStyles = { fontSize: "0.6rem", fontWeight: "500", textAlign: "center", color: "black", marginTop: "-1px", marginBottom: "20px" };

  const tabContainerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "60%",
    height: "25px",
    marginBottom: "30px",
    borderRadius: "6px",
    overflow: "hidden",
    border: "0.5px solid #1a1851"
  };

  const tabStyle = (active) => ({
    flex: 1,
    padding: "6px 0",
    textAlign: "center",
    fontSize: "9px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: active ? "#1a1851" : "#fff",
    color: active ? "#fff" : "#1a1851",
    transition: "0.3s"
  });

  const inputContainerStyle = { position: "relative", width: "60%", height: "30px", marginBottom: "6px", border: "0.5px solid #1A1851", borderRadius: "4px", backgroundColor: "white" };

  const inputStyle = { position: "absolute", left: "40px", top: "9px", width: "280px", backgroundColor: "transparent", border: "none", outline: "none", fontSize: "8px" };

  const iconStyle = { position: "absolute", left: "15px", top: "8px", width: "12px", height: "12px" };

  const toggleIconStyle = { position: "absolute", right: "12px", top: "9px", width: "12px", height: "12px", cursor: "pointer" };

  const buttonStyles = { backgroundColor: "#1a1851", height: "30px", borderRadius: "6px", width: "60%", marginTop: "16px", color: "#ffffff", fontSize: "10px", cursor: "pointer", fontWeight: "bold", border: "none", transition: "background-color 0.3s" };

  const buttonHoverStyles = { backgroundColor: "#000000" };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div
                  style={{
                    position: "absolute",
                    top: "25px",   
                    left: "40px",  
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    zIndex: 100
                  }}
                  onClick={() => navigate("/splash")}
                >
                  <img
                    src={backIcon}
                    alt="Back"
                    style={{ width: "15px", height: "15px", marginRight: "8px" }}
                  />
                </div>
      <div style={scrollContainerStyles}>
        <img src={CapsortImage} alt="Capsort Logo" style={capsortStyles} />
        <h2 style={titleStyles}>Capstone Archiving and Sorting System</h2>

        {/* Tabs */}
        <div style={tabContainerStyle}>
          <div
            style={tabStyle(false)}
            onClick={() => navigate("/signstudent")}
          >
            Student
          </div>
          <div style={tabStyle(true)}>Admin</div>
        </div>

        <form className="w-full flex flex-col items-center">
          {/* Email */}
          <div style={inputContainerStyle}>
            <img src={mailIcon} alt="Mail" style={iconStyle} />
            <input type="email" placeholder="Email Address" style={inputStyle} />
          </div>

          {/* Password */}
          <div style={inputContainerStyle}>
            <img src={passIcon} alt="Password" style={iconStyle} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={inputStyle}
            />
            <img
              src={showPassword ? showIcon : hideIcon}
              alt="Toggle Password"
              style={toggleIconStyle}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Remember Me */}
          <div style={{ position: "relative", top: "2px", left: "2px", display: "flex", alignItems: "center", width: "60%", marginTop: "5px" }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="rememberMe"
              style={{ width: "10px", height: "10px", marginRight: "8px", cursor: "pointer", accentColor: "#1a1851" }}
            />
            <label htmlFor="rememberMe" style={{ fontSize: "8px", color: "#333" }}>Remember Me</label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={buttonStyles}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
          >
            Log In
          </button>
        </form>

{/* Admin Note */}
<div style={{
  marginTop: "16px",
  padding: "12px",
  backgroundColor: "rgba(255, 211, 56, 0.1)",
  border: "1px solid rgba(255, 211, 56, 0.3)",
  borderRadius: "8px",
  width: "60%",
  textAlign: "center"
}}>
  <p style={{ fontSize: "7px", color: "#1a1851", fontFamily: "Poppins" }}>
    Admin access is restricted. Only authorized personnel with valid credentials can login.
  </p>
</div>

        {/* Redirect to Signup */}
        <div style={{ marginTop: "30px", fontSize: "8px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{ fontWeight: "bold", color: "#1a1851", cursor: "pointer", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            onClick={() => navigate("/signup")}
          >
            Sign up here.
          </span>
        </div>
      </div>

      <div style={lottieContainerStyles}>
        <Lottie animationData={SplashAnimation} loop={true} style={lottieStyles} />
      </div>
    </div>
  );
}
