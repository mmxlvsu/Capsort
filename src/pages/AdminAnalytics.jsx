import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "35px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #D8D8D8",
        justifyContent: "space-between",
        padding: "0 30px",
        fontFamily: "Poppins",
        fontSize: "10px",
        fontWeight: 400,
        zIndex: 1000,
      }}
    >
      {/* Left: Logo + Text */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img src={citc} alt="CITC Logo" style={{ height: "20px" }} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <span style={{ fontSize: "10px", fontWeight: 700 }}>Capsort</span>
          <span style={{ fontSize: "8px", fontWeight: 400 }}>
            Capsort Archiving and Sorting System
          </span>
        </div>
      </div>

      {/* Right: Navigation */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admindash")}
        >
          Projects
        </div>
        <div
          style={{ borderBottom: "1px solid black", fontWeight: "700", cursor: "pointer" }}
          onClick={() => navigate("/guest")}
        >
          Analytics
        </div>

        {/* User Icon */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "0.5px solid #1A1851",
              cursor: "pointer",
            }}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <img
              src={userImg}
              alt="User"
              style={{ width: "12px", height: "12px", borderRadius: "20%" }}
            />
          </div>

          {showUserDropdown && (
            <div
              style={{
                position: "absolute",
                top: "28px",
                right: 0,
                backgroundColor: "white",
                border: "1px solid #d8d8d8",
                borderRadius: "4px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                width: "120px",
                fontFamily: "Poppins",
                fontSize: "10px",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => navigate("/login")}
              >
                <img
                  src={require("../assets/signout.png")}
                  alt="Sign Out"
                  style={{ width: "12px", height: "12px" }}
                />
                <span>Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
