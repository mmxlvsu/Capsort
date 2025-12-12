import { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import SplashAnimation from "../assets/splash.json"; 
import CapsortImage from "../assets/capsort.png";     
import backIcon from "../assets/back.png";

import "../styles/SignStudent.css";

export default function SignUp() {
  const navigate = useNavigate();
  const userEmail = "yourname@example.com";

  // Refs for OTP inputs
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    e.target.value = value.slice(-1);
    if (value && index < 3) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Timer
  const [timeLeft, setTimeLeft] = useState(10); // 2 minutes
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  // Handle confirm button
  const handleConfirm = () => {
    const code = inputRefs.current.map(input => input.value).join("");
    console.log("Confirm OTP:", code);
    // Add verification logic here, e.g., call API
    alert("Code confirmed: " + code);
  };

  // Handle resend button
  const handleResend = () => {
    setShowModal(true);
  };

  const confirmResend = () => {
    console.log("Resend confirmed");
    setTimeLeft(10); // reset timer
    setShowModal(false);
    // Add resend code logic here, e.g., call API
    alert("Verification code resent!");
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

        {/* Verification message */}
        <p className="signup-verification-text">
          <span className="signup-verification-message">
            We have sent a verification code to 
          </span>
          <span className="signup-verification-email">
            <strong>{userEmail}</strong>
          </span>
        </p>
        <p 
          className="signup-change-email"
          onClick={() => console.log("Change email clicked")}
        >
          Change email address?
        </p>

        {/* OTP Inputs */}
        <div className="signup-verification-box">
          {[0,1,2,3].map((i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="text"
              maxLength="1"
              className="signup-verification-input"
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        {/* Timer */}
        <p className="signup-timer">
          <span className="signup-timer-label">Time left:</span>{" "}
          <span className="signup-timer-value">{formatTime(timeLeft)}</span>
        </p>

        {/* Buttons */}
        <div className="signup-verification-buttons">
          <button 
            className="signup-confirm-button" 
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button 
            className="signup-resend-button" 
            onClick={handleResend} 
            disabled={timeLeft > 0}
          >
            Resend
          </button>
        </div>
      </div>

      {/* Right Lottie Animation */}
      <div className="signup-lottie-container">
        <Lottie 
          animationData={SplashAnimation} 
          loop={true} 
          className="signup-lottie-animation" 
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure to resend the code?</h3>
            <div className="modal-buttons">
              <button onClick={confirmResend}>Yes</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
