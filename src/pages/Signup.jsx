import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import SplashAnimation from "../assets/splash.json";
import CapsortImage from "../assets/capsort.png";
import { authService } from "../services/auth";

import backIcon from "../assets/back.png";
import userIcon from "../assets/user.png";
import phoneIcon from "../assets/phone.png";
import mailIcon from "../assets/mail.png";
import passIcon from "../assets/pass.png";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

import "../styles/Signup.css"; // merged CSS

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Disable button if any field is empty or checkbox not checked or passwords mismatch
  const isButtonDisabled =
    !fullName ||
    !contact ||
    !email ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword ||
    !agreed ||
    loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Client-side validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setError("Password must contain at least one lowercase letter, one uppercase letter, and one number");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    console.log('🔧 Submitting registration...', { fullName, contact, email });

    try {
      const result = await authService.register({
        fullName,
        contactNumber: contact,
        email,
        password
      });

      console.log('📥 Registration result:', result);

      if (result.success) {
        alert("Registration successful! Please login.");
        navigate("/signstudent");
      } else {
        console.error('❌ Registration failed:', result.error);
        setError(result.error || result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Back Button */}
      <div className="signup-back-button" onClick={() => navigate("/splash")}>
        <img src={backIcon} alt="Back" className="signup-back-icon" />
      </div>

      {/* Scrollable Form */}
      <div className="signup-scroll-container">
        <img src={CapsortImage} alt="Capsort Logo" className="signup-logo" />
        <h2 className="signup-title">Capstone Archiving and Sorting System</h2>

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

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="signup-input-container">
            <img src={userIcon} alt="User" className="signup-icon" />
            <input
              type="text"
              placeholder="Full Name"
              className="signup-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Contact */}
          <div className="signup-input-container">
            <img src={phoneIcon} alt="Phone" className="signup-icon" />
            <input
              type="tel"
              placeholder="Contact Number"
              className="signup-input"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="signup-input-container">
            <img src={mailIcon} alt="Mail" className="signup-icon" />
            <input
              type="email"
              placeholder="Email Address"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="signup-input-container">
            <img src={passIcon} alt="Password" className="signup-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? showIcon : hideIcon}
              alt="Toggle Password"
              className="signup-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <p className="signup-input-note">Password must be 8-16 characters</p>

          {/* Confirm Password */}
          <div className="signup-input-container">
            <img src={passIcon} alt="Confirm Password" className="signup-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="signup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img
              src={showConfirmPassword ? showIcon : hideIcon}
              alt="Toggle Confirm Password"
              className="signup-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <p className="signup-input-note">
            Password must match
            {password && confirmPassword && password !== confirmPassword && (
              <span style={{ color: "red" }}> — Passwords do not match</span>
            )}
          </p>

          {/* Terms */}
          <div className="signup-checkbox-container">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              id="termsCheckbox"
            />
            <label htmlFor="termsCheckbox">
              I agree to{" "}
              <span onClick={() => setShowTerms(true)}>Terms of Service</span> &{" "}
              <span onClick={() => setShowPrivacy(true)}>Privacy Policy</span>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="signup-button"
            style={{
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
              opacity: isButtonDisabled ? 0.6 : 1
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Already have an account */}
        <div className="signup-login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/signstudent")}>Log in here.</span>
        </div>
      </div>

      {/* Lottie Animation */}
      <div className="signup-lottie">
        <Lottie animationData={SplashAnimation} loop={true} />
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-terms">
              <h3>Terms of Service</h3>
              <p><strong>1. Acceptance of Terms</strong><br />By accessing and using the CapSort (Capstone Archiving and Sorting System), you accept and agree to be bound by the terms and provision of this agreement.</p>
              <p><strong>2. Use License</strong><br />Permission is granted to temporarily access the materials on CapSort for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
              <p><strong>3. User Accounts</strong><br />When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>
              <p><strong>4. User Responsibilities</strong><br />You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
              <p><strong>5. Content Guidelines</strong><br />Users must only upload capstone papers and related academic materials. Any inappropriate, offensive, or copyrighted content without permission is strictly prohibited.</p>
              <p><strong>6. Intellectual Property</strong><br />All capstone papers uploaded remain the intellectual property of their respective authors. By uploading content, users grant CapSort a license to store, display, and share the content within the platform.</p>
              <p><strong>7. Termination</strong><br />We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              <button className="modal-close-btn" onClick={() => setShowTerms(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-privacy">
              <h3>Privacy Policy</h3>
              <p><strong>1. Information We Collect</strong><br />We collect information you provide directly to us, including your name, email address, contact number, and academic materials you upload to the platform.</p>
              <p><strong>2. How We Use Your Information</strong><br />We use the information we collect to:<br />• Provide, maintain, and improve our services<br />• Process and complete transactions<br />• Send you technical notices and support messages<br />• Communicate with you about products, services, and events</p>
              <p><strong>3. Information Sharing</strong><br />We do not share your personal information with third parties except as described in this policy. Academic materials you upload may be visible to other users of the platform according to your sharing settings.</p>
              <p><strong>4. Data Security</strong><br />We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
              <p><strong>5. Data Retention</strong><br />We retain your account information for as long as your account is active or as needed to provide you services. You may request deletion of your account at any time.</p>
              <p><strong>6. Your Rights</strong><br />You have the right to:<br />• Access your personal information<br />• Correct inaccurate information<br />• Request deletion of your information<br />• Object to our use of your information</p>
              <p><strong>7. Contact Us</strong><br />If you have any questions about this Privacy Policy, please contact us through the platform's support system or at the University of Science and Technology of Southern Philippines.</p>
              <button className="modal-close-btn" onClick={() => setShowPrivacy(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
