import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splash.css";
import SplashImage from "../assets/splash.png";
import CapSortLogo from "../assets/capsort.png";
import phone from "../assets/phone.png";
import web from "../assets/web.png";
import mail from "../assets/mail.png";
import itLogo from "../assets/it.png";
import citcLogo from "../assets/citc.png";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      {/* White gradient overlay from left */}
      <div className="white-overlay"></div>

      {/* Splash image */}
      <img src={SplashImage} alt="Splash" className="splash-image" />

      {/* CapSort logo */}
      <img src={CapSortLogo} alt="CapSort Logo" className="capsort-logo" />

      {/* Welcome text */}
      <div className="welcometext">
        WELCOME TO
      </div>

      {/* Project description */}
      <div className="project-description">
        A Capstone Sorting and Archiving System of USTP CDO IT Department helps students and staff organize and access capstone projects easily. Store files, track progress, and maintain a clean archive—all in one platform. Save time, reduce clutter, and keep your projects well-managed.
      </div>

      {/* Explore button below description */}
      <button
        className="btn-explore"
        onClick={() => navigate("/guest")}
      >
        Explore
        <img
          src={require("../assets/arrow.png")}
          alt="arrow"
          className="explore-arrow"
        />
      </button>

      {/* Bottom-center icons */}
      <div className="bottom-icons">
        <div className="icon-btn" onClick={() => alert("Mail clicked")}>
          <img src={mail} alt="Mail" className="icon" />
        </div>
        <div className="icon-btn" onClick={() => alert("Web clicked")}>
          <img src={web} alt="Web" className="icon" />
        </div>
        <div className="icon-btn" onClick={() => alert("Phone clicked")}>
          <img src={phone} alt="Phone" className="icon" />
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        &copy; 2025 Capstone Sorting and Archiving System
      </div>

      {/* Top container with logos on left and buttons on right */}
      <div className="top-buttons-container">
        <div className="top-logos">
          <img src={itLogo} alt="IT Logo" className="logo-icon" />
          <img src={citcLogo} alt="CITC Logo" className="logo-icon" />
        </div>
        <div className="top-buttons">
          <button className="btn-register" onClick={() => navigate("/signstudent")}>
            Login
          </button>
          <button className="btn-login" onClick={() => navigate("/signup")}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
