import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SplashAnimation from "../assets/splash.json";
import SplashImage from "../assets/splash.png";
import SplashText from "../assets/splashtext.png";
import ArrowIcon from "../assets/arrow.png";
import MailIcon from "../assets/mail.png";
import WebIcon from "../assets/web.png";
import PhoneIcon from "../assets/phone.png";

export default function Splash() {
  const [exploreActive, setExploreActive] = useState(false);
  const navigate = useNavigate();

  const linkStyles = {
    fontSize: "0.55rem",
    fontWeight: "600",
    color: "#ffffff",
    hoverColor: "#1A1851",
    top: "1rem",
    right: "2rem",
    gap: "1.5rem",
    transition: "color 0.2s",
  };

  const footerStyles = {
    fontSize: "0.3rem",
    fontWeight: "300",
    color: "#ffffff",
    textAlign: "center",
    bottom: "1.8rem",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const iconButtonStyles = {
    size: "13px",
    gap: "0.5rem",
    bottom: "0.7rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const centerTextStyles = {
    text: "Welcome to",
    fontSize: "0.6rem",
    fontWeight: "400",
    color: "#ffffff",
    top: "30%",
    left: "19%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  };

  const centerImageStyles = {
    width: "650px",
    height: "auto",
    top: "43%",
    left: "37%",
    transform: "translate(-50%, -50%)",
  };

  const exploreButtonBase = {
    top: "60%",
    left: "21.3%",
    transform: "translate(-50%, -50%)",
    padding: "3px 15px",
    fontSize: "0.6rem",
    fontWeight: "600",
    border: "1px solid white",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    transition: "all 0.2s",
  };

  const exploreButtonStyles = {
    ...exploreButtonBase,
    color: exploreActive ? "#ffffff" : "black",
    backgroundColor: exploreActive ? "transparent" : "white",
  };

  return (
    <div className="w-full h-screen relative">
      <img src={SplashImage} alt="Splash" className="w-full h-full object-cover" />

      <div className="absolute flex" style={{ top: linkStyles.top, right: linkStyles.right, gap: linkStyles.gap }}>
        <Link
          to="/signup"
          style={{ fontSize: linkStyles.fontSize, fontWeight: linkStyles.fontWeight, color: linkStyles.color, transition: linkStyles.transition }}
          onMouseEnter={(e) => (e.currentTarget.style.color = linkStyles.hoverColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = linkStyles.color)}
        >
          Register
        </Link>
        <Link
          to="/signstudent"
          style={{ fontSize: linkStyles.fontSize, fontWeight: linkStyles.fontWeight, color: linkStyles.color, transition: linkStyles.transition }}
          onMouseEnter={(e) => (e.currentTarget.style.color = linkStyles.hoverColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = linkStyles.color)}
        >
          Login
        </Link>
      </div>

      <div
        className="absolute"
        style={{
          fontSize: centerTextStyles.fontSize,
          fontWeight: centerTextStyles.fontWeight,
          color: centerTextStyles.color,
          top: centerTextStyles.top,
          left: centerTextStyles.left,
          transform: centerTextStyles.transform,
          textAlign: centerTextStyles.textAlign,
        }}
      >
        {centerTextStyles.text}
      </div>

      <img
        src={SplashText}
        alt="Splash Text"
        className="absolute"
        style={{
          width: centerImageStyles.width,
          height: centerImageStyles.height,
          top: centerImageStyles.top,
          left: centerImageStyles.left,
          transform: centerImageStyles.transform,
        }}
      />

      <button
        className="absolute"
        style={exploreButtonStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.querySelector("img").style.filter = "invert(1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.color = "black";
          e.currentTarget.querySelector("img").style.filter = "invert(0)";
        }}
        onClick={() => navigate("/guest")}
      >
        Explore
        <img src={ArrowIcon} alt="arrow" style={{ width: "16px", height: "16px", transition: "filter 0.2s" }} />
      </button>

      <div className="absolute" style={footerStyles}>
        <p>© 2025 University of Science and Technology of Southern Philippines</p>
        <p>Capstone Sorting and Archiving System</p>
      </div>

      <div
        className="absolute flex"
        style={{
          bottom: iconButtonStyles.bottom,
          left: iconButtonStyles.left,
          transform: iconButtonStyles.transform,
          gap: iconButtonStyles.gap,
        }}
      >
        {[MailIcon, WebIcon, PhoneIcon].map((icon, idx) => (
          <button
            key={idx}
            style={{ backgroundColor: iconButtonStyles.backgroundColor, border: iconButtonStyles.border, cursor: iconButtonStyles.cursor }}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("img").style.filter =
                "invert(21%) sepia(85%) saturate(2710%) hue-rotate(196deg) brightness(91%) contrast(93%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("img").style.filter = "invert(100%)";
            }}
          >
            <img src={icon} alt="icon" style={{ width: iconButtonStyles.size, height: iconButtonStyles.size, transition: "filter 0.2s" }} />
          </button>
        ))}
      </div>
    </div>
  );
}
