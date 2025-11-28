import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import SplashAnimation from "../assets/splash.json"; 
import CapsortImage from "../assets/capsort.png";     

export default function SignStudent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(120);
  const [showPopup, setShowPopup] = useState(false);

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setEmail("your.email@example.com");
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setShowPopup(true);
    }
  }, [timer]);

  const handleChange = (e, nextInput) => {
    if (e.target.value.length === 1 && nextInput) nextInput.current.focus();
  };

  const handleKeyDown = (e, prevInput) => {
    if ((e.key === "Backspace" || e.key === "Delete") && prevInput && e.target.value === "")
      prevInput.current.focus();
  };

  const handleVerify = () => {
    const code = [input1, input2, input3, input4].map(ref => ref.current?.value || "").join("");
    if (code.length !== 4) return alert("Please enter the complete 4-digit code");
    alert(`Code verified: ${code}`);
  };

  const handleResendCode = () => {
    alert("Resending code...");
    setTimer(120);
    setShowPopup(false);
    [input1, input2, input3, input4].forEach(ref => ref.current && (ref.current.value = ""));
    input1.current?.focus();
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  // Styles
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
    alignItems: "flex-start",
    position: "relative"
  };
  const capsortStyles = { width: "180px", height: "auto", marginBottom: "-4px", marginTop: "62px", alignSelf: "center" };
  const titleStyles = { fontSize: "0.6rem", fontWeight: "500", textAlign: "center", color: "black", marginTop: "-1px", marginBottom: "20px", alignSelf: "center" };
  const verificationTextStyles = { fontSize: "0.4rem", color: "black", textAlign: "left", marginTop: "12px" };
  const emailTextStyles = { fontSize: "0.35rem", fontWeight: "bold", textAlign: "left", color: "gray" };
  const changeEmailStyles = { fontSize: "0.35rem", textDecoration: "underline", fontWeight: "bold", cursor: "pointer", marginTop: "12px", color: "#1a1851" };
  const codeInputContainerStyles = { display: "flex", gap: "6px", marginTop: "8px" };
  const codeInputStyles = { marginTop: "15px", width: "40px", height: "40px", textAlign: "center", fontSize: "0.9rem", border: "0.5px solid #1a1851", borderRadius: "4px" };
  const timerStyles = { fontSize: "0.4rem", marginTop: "16px", textAlign: "center", fontWeight: "bold", color: "black" };
  const confirmButtonStyles = { fontSize: "0.5rem", marginTop: "12px", padding: "5px 0", width: "45%", backgroundColor: "#1a1851", color: "#fff", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div style={scrollContainerStyles}>
        <img src={CapsortImage} alt="Capsort Logo" style={capsortStyles} />
        <h2 style={titleStyles}>Capstone Archiving and Sorting System</h2>

        {!loading && (
  <div style={{ alignSelf: "center", textAlign: "center", width: "100%" }}>
    <p style={{ fontSize: "0.4rem", color: "black" }}>We have sent the verification code to</p>
    <span style={{ fontSize: "0.35rem", fontWeight: "bold", color: "gray", display: "block", marginTop: "2px" }}>{email}</span>
    <span
      style={{ fontSize: "0.35rem", textDecoration: "underline", fontWeight: "bold", cursor: "pointer", color: "#1a1851", display: "block", marginTop: "4px" }}
      onClick={() => navigate("/signup")}
    >
      Change email address?
    </span>

    {/* 4-digit code inputs */}
    <div style={{ ...codeInputContainerStyles, justifyContent: "center" }}>
      <input type="tel" maxLength={1} ref={input1} style={codeInputStyles} onChange={e => handleChange(e, input2)} onKeyDown={e => handleKeyDown(e, null)} />
      <input type="tel" maxLength={1} ref={input2} style={codeInputStyles} onChange={e => handleChange(e, input3)} onKeyDown={e => handleKeyDown(e, input1)} />
      <input type="tel" maxLength={1} ref={input3} style={codeInputStyles} onChange={e => handleChange(e, input4)} onKeyDown={e => handleKeyDown(e, input2)} />
      <input type="tel" maxLength={1} ref={input4} style={codeInputStyles} onChange={e => handleChange(e, null)} onKeyDown={e => handleKeyDown(e, input3)} />
    </div>

    {/* Timer */}
    <div style={timerStyles}>
      Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>

    {/* Confirm button */}
    <button style={confirmButtonStyles} onClick={handleVerify}>
      Confirm
    </button>
  </div>
)}
      </div>

      <div style={lottieContainerStyles}>
        <Lottie animationData={SplashAnimation} loop={true} style={lottieStyles} />
      </div>

      {/* Resend popup */}
{showPopup && (
  <div className="fixed inset-0 flex justify-center items-center bg-black/50 p-4">
    <div className="bg-white rounded-lg text-center p-5" style={{ width: "30vw" }}>
      <p className="text-black mb-4" style={{ fontSize: "0.8rem" }}>
        Do you want to resend a new code?
      </p>
      <div className="flex justify-between gap-3">
        <button
          className="flex-1 rounded-lg bg-black text-white"
          style={{ fontSize: "0.8rem", padding: "6px 0" }}
          onClick={handleResendCode}
        >
          Yes
        </button>
        <button
          className="flex-1 rounded-lg bg-gray-300"
          style={{ fontSize: "0.8rem", padding: "6px 0" }}
          onClick={() => setShowPopup(false)}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
