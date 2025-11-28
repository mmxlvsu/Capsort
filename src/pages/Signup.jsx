import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import SplashAnimation from "../assets/splash.json";
import CapsortImage from "../assets/capsort.png"; 
import backIcon from "../assets/back.png";

import userIcon from "../assets/user.png";
import phoneIcon from "../assets/phone.png";
import mailIcon from "../assets/mail.png";
import passIcon from "../assets/pass.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png"; 
import Splash from "./Splash";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false); 
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Lottie container styles
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
    marginTop: "2px"
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

        <form className="w-full flex flex-col items-center">
          {/* Full Name */}
          <div style={inputContainerStyle}>
            <img src={userIcon} alt="User" style={iconStyle} />
            <input type="text" placeholder="Full Name" style={inputStyle} />
          </div>

          {/* Contact Number */}
          <div style={inputContainerStyle}>
            <img src={phoneIcon} alt="Phone" style={iconStyle} />
            <input type="tel" placeholder="Contact Number" style={inputStyle} />
          </div>

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
          <p style={{ fontSize: "7.5px", color: "gray", marginTop: "-3px", marginLeft: "-100px" }}>
            Password must be 8-16 characters
          </p>

          {/* Confirm Password */}
          <div style={inputContainerStyle}>
            <img src={passIcon} alt="Confirm Password" style={iconStyle} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
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

          {/* Terms Checkbox */}
          <div
            style={{
              position: "relative",
              top: "2px",
              left: "2px",
              display: "flex",
              alignItems: "center",
              width: "60%",
              marginTop: "5px",
            }}
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              id="termsCheckbox"
              style={{
                width: "10px",
                height: "10px",
                marginRight: "8px",
                cursor: "pointer",
                accentColor: "#1a1851"
              }}
            />
            <label
              htmlFor="termsCheckbox"
              style={{ fontSize: "7px", color: "#333" }}
            >
              I agree to{" "}
              <span
                style={{ color: "#1a1851", fontWeight: "bold", cursor: "pointer" }}
                onClick={() => setShowTerms(true)}
              >
                Terms of Service
              </span>{" "}
              &{" "}
              <span
                style={{ color: "#1a1851", fontWeight: "bold", cursor: "pointer" }}
                onClick={() => setShowPrivacy(true)}
              >
                Privacy Policy
              </span>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={!agreed}
            style={{
              ...buttonStyles,
              opacity: agreed ? 1 : 0.5,
              cursor: agreed ? "pointer" : "not-allowed"
            }}
            onMouseEnter={(e) => { if (agreed) e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor }}
            onMouseLeave={(e) => { if (agreed) e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor }}
          >
            Create Account
          </button>
        </form>

        {/* Already have an account */}
        <div style={{ marginTop: "30px", fontSize: "8px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#1a1851",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
            onClick={() => navigate("/signstudent")}
          >
            Log in here.
          </span>
        </div>
      </div>

      <div style={lottieContainerStyles}>
        <Lottie animationData={SplashAnimation} loop={true} style={lottieStyles} />
      </div>

      {/* Terms Modal */} {showTerms && ( <div style={modalOverlayStyle}> <div style={modalContentStyle}> <h3>Terms of Service</h3> <button onClick={() => setShowTerms(false)} style={modalCloseBtnStyle}>Close</button> </div> </div> )} {showTerms && ( <div style={modalOverlayStyle}> <div style={{ ...modalContentStyle, textAlign: "justify", fontSize: "13px" }}> <h3 style={{ marginBottom: "12px", fontWeight: "bold" }}>Terms of Service</h3> <p><strong>1. Acceptance of Terms</strong><br /> By accessing and using the CapSort (Capstone Archiving and Sorting System), you accept and agree to be bound by the terms and provision of this agreement.</p> <p><strong>2. Use License</strong><br /> Permission is granted to temporarily access the materials on CapSort for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p> <p><strong>3. User Accounts</strong><br /> When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p> <p><strong>4. User Responsibilities</strong><br /> You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p> <p><strong>5. Content Guidelines</strong><br /> Users must only upload capstone papers and related academic materials. Any inappropriate, offensive, or copyrighted content without permission is strictly prohibited.</p> <p><strong>6. Intellectual Property</strong><br /> All capstone papers uploaded remain the intellectual property of their respective authors. By uploading content, users grant CapSort a license to store, display, and share the content within the platform.</p> <p><strong>7. Termination</strong><br /> We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p> <button onClick={() => setShowTerms(false)} style={modalCloseBtnStyle}>Close</button> </div> </div> )} {/* Privacy Modal */} {showPrivacy && ( <div style={modalOverlayStyle}> <div style={modalContentStyle}> <h3>Privacy Policy</h3> <button onClick={() => setShowPrivacy(false)} style={modalCloseBtnStyle}>Close</button> </div> </div> )} {showPrivacy && ( <div style={modalOverlayStyle}> <div style={{ ...modalContentStyle, textAlign: "justify", fontSize: "12px" }}> <h3 style={{ marginBottom: "12px", fontWeight: "bold" }}>Privacy Policy</h3> <p><strong>1. Information We Collect</strong><br /> We collect information you provide directly to us, including your name, email address, contact number, and academic materials you upload to the platform.</p> <p><strong>2. How We Use Your Information</strong><br /> We use the information we collect to:<br /> • Provide, maintain, and improve our services<br /> • Process and complete transactions<br /> • Send you technical notices and support messages<br /> • Communicate with you about products, services, and events</p> <p><strong>3. Information Sharing</strong><br /> We do not share your personal information with third parties except as described in this policy. Academic materials you upload may be visible to other users of the platform according to your sharing settings.</p> <p><strong>4. Data Security</strong><br /> We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p> <p><strong>5. Data Retention</strong><br /> We retain your account information for as long as your account is active or as needed to provide you services. You may request deletion of your account at any time.</p> <p><strong>6. Your Rights</strong><br /> You have the right to:<br /> • Access your personal information<br /> • Correct inaccurate information<br /> • Request deletion of your information<br /> • Object to our use of your information</p> <p><strong>7. Contact Us</strong><br /> If you have any questions about this Privacy Policy, please contact us through the platform's support system or at the University of Science and Technology of Southern Philippines.</p> <button onClick={() => setShowPrivacy(false)} style={modalCloseBtnStyle}>Close</button> </div> </div> )}
    </div>
  );
}
