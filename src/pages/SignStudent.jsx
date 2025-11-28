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

export default function SignStudent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const modalOverlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "350px",
    maxHeight: "420px",
    overflowY: "auto",
    textAlign: "center"
  };

  const modalCloseBtnStyle = {
    marginTop: "12px",
    padding: "4px 15px",
    backgroundColor: "#1a1851",
    color: "#fff",
    border: "none",
    fontSize: "12px",
    borderRadius: "4px",
    cursor: "pointer"
  };

  const lottieContainerStyles = { position: "relative", top: "0px", left: "0px", width: "440px", height: "440px", backgroundColor: "rgba(26, 24, 81, 0.98)", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", justifyContent: "center", alignItems: "center" };
  const lottieStyles = { width: "80%", height: "80%" };
  const scrollContainerStyles = { width: lottieContainerStyles.width, height: lottieContainerStyles.height, borderRadius: "12px", overflowY: "auto", padding: "20px", marginRight: "20px", display: "flex", flexDirection: "column", alignItems: "center" };
  const capsortStyles = { width: "180px", height: "auto", marginBottom: "-4px", marginTop: "32px" };
  const titleStyles = { fontSize: "0.6rem", fontWeight: "500", textAlign: "center", color: "black", marginTop: "-1px", marginBottom: "20px" };
  const tabContainerStyle = { display: "flex", justifyContent: "center", width: "60%", height: "25px", marginBottom: "30px", borderRadius: "6px", overflow: "hidden", border: "0.5px solid #1a1851" };
  const tabStyle = (active) => ({ flex: 1, padding: "6px 0", textAlign: "center", fontSize: "9px", fontWeight: "bold", cursor: "pointer", backgroundColor: active ? "#1a1851" : "#fff", color: active ? "#fff" : "#1a1851", transition: "0.3s" });
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
          <div style={tabStyle(true)}>Student</div>
          <div style={tabStyle(false)} onClick={() => navigate("/signadmin")}>Admin</div>
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
            <input type={showPassword ? "text" : "password"} placeholder="Password" style={inputStyle} />
            <img src={showPassword ? showIcon : hideIcon} alt="Toggle Password" style={toggleIconStyle} onClick={() => setShowPassword(!showPassword)} />
          </div>

          {/* Remember Me + Forgot Password */}
          <div style={{ position: "relative", top: "2px", left: "2px", display: "flex", alignItems: "center", justifyContent: "space-between", width: "60%", marginTop: "5px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} id="rememberMe" style={{ width: "10px", height: "10px", marginRight: "8px", cursor: "pointer", accentColor: "#1a1851" }} />
              <label htmlFor="rememberMe" style={{ fontSize: "8px", color: "#333" }}>Remember Me</label>
            </div>

            <span
              style={{ fontSize: "8px", color: "#1a1851", cursor: "pointer", textDecoration: "none", fontWeight: "bold" }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </span>
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

      {/* Forgot Password Modal */}
{showForgotModal && (
  <div style={modalOverlayStyle}>
    <div style={{ ...modalContentStyle, textAlign: "justify", fontSize: "10px" }}>
      <h3 style={{ marginBottom: "8px", fontWeight: "bold", fontSize: "12px" }}>
        Forgot Password
      </h3>
      <p>Enter your email address below to receive a password reset link.</p>

      {/* Email Input with Icon */}
      <div style={{ position: "relative", width: "100%", marginTop: "8px" }}>
        <img
          src={mailIcon}
          alt="Mail"
          style={{
            position: "absolute",
            left: "8px",
            top: "60%",
            transform: "translateY(-50%)",
            width: "14px",
            height: "14px"
          }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "6px 8px 6px 30px",
            fontSize: "10px",
            borderRadius: "4px",
            border: "1px solid #1a1851",
            marginTop: "8px"
          }}
        />
      </div>

      {/* Buttons with gap */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
        <button
          style={{ ...modalCloseBtnStyle, flex: 1, marginRight: "6px" }}
          onClick={() => {
            alert(`Reset link sent to ${forgotEmail}`);
            setShowForgotModal(false);
          }}
        >
          Send Reset Link
        </button>
        <button
          style={{ ...modalCloseBtnStyle, flex: 1, backgroundColor: "#888", marginLeft: "6px" }}
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
