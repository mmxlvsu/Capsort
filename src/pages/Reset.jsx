import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import SplashAnimation from "../assets/splash.json"; 
import CapsortImage from "../assets/capsort.png"; 
import userIcon from "../assets/user.png";
import phoneIcon from "../assets/phone.png";
import mailIcon from "../assets/mail.png";
import passIcon from "../assets/pass.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

export default function Signup() {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false); 
  const [showTerms, setShowTerms] = useState(false); 
  const [showPrivacy, setShowPrivacy] = useState(false);

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

  const lottieStyles = {
    width: "80%",
    height: "80%"
  };

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

  const capsortStyles = {
    width: "180px",
    height: "auto",
    marginBottom: "-4px",
    marginTop: "50px"
  };

  const titleStyles = {
    fontSize: "0.6rem",
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: "-1px",
    marginBottom: "30px"
  };

  const inputContainerStyle = {
    position: "relative",
    width: "60%",
    height: "30px",
    marginBottom: "6px",
    border: "0.5px solid #1A1851",
    borderRadius: "4px",
    backgroundColor: "white"
  };

  const inputStyle = {
    position: "absolute",
    left: "40px",
    top: "9px",
    width: "280px",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontSize: "8px"
  };

  const iconStyle = {
    position: "absolute",
    left: "15px",
    top: "8px",
    width: "12px",
    height: "12px"
  };

  const toggleIconStyle = {
    position: "absolute",
    right: "12px",
    top: "9px",
    width: "12px",
    height: "12px",
    cursor: "pointer"
  };

  const buttonStyles = {
    backgroundColor: "#1a1851",
    height: "30px",
    borderRadius: "6px",
    width: "60%",
    marginTop: "16px",
    color: "#ffffff",
    fontSize: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    border: "none",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyles = {
    backgroundColor: "#000000",
  };

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


  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div style={scrollContainerStyles}>
        <img src={CapsortImage} alt="Capsort Logo" style={capsortStyles} />
        <h2 style={titleStyles}>Capstone Archiving and Sorting System</h2>
<p
  style={{
    fontSize: "0.5rem",
    color: "black",
    marginBottom: "8px",
    alignSelf: "flex-start",
    marginLeft: "80px", 
    textAlign: "left"
  }}
>
  Enter your new password
</p>

        <form className="w-full flex flex-col items-center">

          {/* Password */}
          <div style={inputContainerStyle}>
            <img src={passIcon} alt="Password" style={iconStyle} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              style={inputStyle}
            />
            <img
              src={showPassword ? showIcon : hideIcon}
              alt="Toggle Password"
              style={toggleIconStyle}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <p style={{ fontSize: "7.5px", color: "gray", marginTop: "-3px", marginLeft: "-100px" }}>
            Password must be 8-16 characters
          </p>

          {/* Confirm Password */}
          <div style={inputContainerStyle}>
            <img src={passIcon} alt="Confirm Password" style={iconStyle} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              style={inputStyle}
            />
            <img
              src={showConfirmPassword ? showIcon : hideIcon}
              alt="Toggle Confirm Password"
              style={toggleIconStyle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <p style={{ fontSize: "7.5px", color: "gray", marginTop: "-3px", marginLeft: "-146px" }}>
            Password must match
          </p>


          {/* Create Account Button */}
<button
  type="submit"
  style={{ ...buttonStyles }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
>
  Reset Password
</button>

        </form>


      </div>

      <div style={lottieContainerStyles}>
        <Lottie animationData={SplashAnimation} loop={true} style={lottieStyles} />
      </div>
    </div>
  );
}
