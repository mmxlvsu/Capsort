import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import bookIcon from "../assets/book.png";
import authorIcon from "../assets/author.png";
import yearIcon from "../assets/year.png";
import saved from "../assets/saved.png";

export default function NavigationBar({ studentName }) {
  const navigate = useNavigate();
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  const [field, setField] = useState("All Fields");
  const [fromYear, setFromYear] = useState("From Year");
  const [toYear, setToYear] = useState("To Year");
  const [fieldOpen, setFieldOpen] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <div>
      {/* Navigation Bar */}
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
          color: "black",
          fontFamily: "Poppins",
          fontSize: "10px",
          fontWeight: 400,
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src={citc} alt="CITC Logo" style={{ height: "20px" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: "10px", fontWeight: 700 }}>Capsort</span>
            <span style={{ fontSize: "8px", fontWeight: 400 }}>
              Capsort Archiving and Sorting System
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/studentdash")}>
            Projects
          </div>
          <div
            style={{ cursor: "pointer", borderBottom: "1px solid black", fontWeight: "700" }}
            onClick={() => navigate("/saved")}
          >
            Saved Projects
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/studentabout")}>
            About Us
          </div>

          {/* User Icon */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px" }}>
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

            {/* User Dropdown */}
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

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "61px",
          right: "50px",
          fontFamily: "Poppins",
          fontSize: "16px",
          fontWeight: 600,
          color: "#1A1851",
        }}
      >
        Capstone Projects
      </div>
      <div
        style={{
          position: "absolute",
          top: "82px",
          right: "50px",
          fontFamily: "Poppins",
          fontSize: "11px",
          fontWeight: 400,
          color: "#6A6A6A",
        }}
      >
        0 paper found
      </div>

      {/* Papers Container */}
      <div
        className="hide-scrollbar"
        style={{
          position: "absolute",
          top: "105px",
          right: "30px",
          width: "70%",
          bottom: "20px",
          overflowY: "auto",
          padding: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => {
          const fieldName = index % 2 === 0 ? "IoT" : "Database";
          const bannerColor = fieldName === "IoT" ? "#2ecc71" : "#f1c40f";
          const title = `Capstone Title ${index + 1}`;
          const year = 2025 - index;
          const author = `Author ${index + 1}`;

          return (
            <div
              key={index}
              style={{
                position: "relative",
                padding: "12px",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "0.5px solid #1A1851",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontFamily: "Poppins",
                minHeight: "130px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  backgroundColor: bannerColor,
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "500",
                  padding: "2px 6px",
                  borderTopRightRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }}
              >
                {fieldName}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "13px" }}>
                <img src={bookIcon} alt="Book" style={{ width: "18px", height: "18px" }} />
                {title}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: "#6A6A6A" }}>
                <img src={authorIcon} alt="Author" style={{ width: "12px", height: "12px" }} /> {author}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: "#6A6A6A" }}>
                <img src={yearIcon} alt="Year" style={{ width: "12px", height: "12px" }} /> {year}
              </div>

              <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "9px", color: "black" }}>Removed from Saved</span>
                <img
                  src={saved}
                  alt="Saved Icon"
                  style={{ width: "14px", height: "14px", cursor: "pointer" }}
                  onClick={() => console.log("Saved icon clicked!")}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Filters */}
      <div
        style={{
          position: "absolute",
          top: "65px",
          left: "20px",
          width: "22%",
          border: "1px solid #1a1851",
          borderRadius: "8px",
          padding: "15px",
          backgroundColor: "white",
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Filter Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={filterIcon} alt="Filter" style={{ width: "12px", height: "12px" }} />
          <h2 style={{ fontFamily: "Poppins", fontSize: "10px", fontWeight: "500", color: "#1a1851" }}>Filters</h2>
        </div>

        {/* Search */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <label style={{ fontFamily: "Poppins", fontSize: "8px", color: "#000" }}>Search</label>
          <div style={{ position: "relative" }}>
            <img
              src={searchIcon}
              alt="Search"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "10px",
                height: "10px",
              }}
            />
            <input
              type="text"
              placeholder="Title, Author, or keyword"
              style={{
                width: "100%",
                padding: "8px 12px 8px 32px",
                fontSize: "7px",
                borderRadius: "4px",
                border: "1px solid #d8d8d8",
              }}
            />
          </div>
        </div>

        {/* Fields Dropdown */}
        <div style={{ position: "relative", marginTop: "-15px", marginBottom: "10px" }}>
          <label style={{ fontFamily: "Poppins", fontSize: "8px", color: "#000" }}>Fields</label>
          <div
            style={{
              width: "100%",
              padding: "6px 12px",
              fontSize: "7px",
              borderRadius: "4px",
              border: "1px solid #d8d8d8",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setFieldOpen(!fieldOpen)}
          >
            {field}
            <img src={dropdownIcon} alt="Dropdown" style={{ width: "8px", height: "8px" }} />
          </div>
          {fieldOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #d8d8d8",
                borderRadius: "4px",
                marginTop: "2px",
                zIndex: 10,
              }}
            >
              {["All Fields", "IoT", "Database"].map((option) => (
                <div
                  key={option}
                  style={{ padding: "6px 12px", fontSize: "7px", cursor: "pointer" }}
                  onClick={() => {
                    setField(option);
                    setFieldOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Year Range */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "-15px", marginBottom: "0px" }}>
          <label style={{ fontFamily: "Poppins", fontSize: "8px", color: "#000" }}>Year</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {/** From Year */}
            <div style={{ position: "relative", flex: 1 }}>
              <div
                style={{
                  width: "100%",
                  padding: "6px 12px",
                  fontSize: "7px",
                  borderRadius: "4px",
                  border: "1px solid #d8d8d8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setFromOpen(!fromOpen)}
              >
                {fromYear}
                <img src={dropdownIcon} alt="Dropdown" style={{ width: "8px", height: "8px" }} />
              </div>
              {fromOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    backgroundColor: "white",
                    border: "1px solid #d8d8d8",
                    borderRadius: "4px",
                    marginTop: "2px",
                    zIndex: 10,
                    maxHeight: "100px",
                    overflowY: "auto",
                  }}
                >
                  {years.map((year) => (
                    <div
                      key={year}
                      style={{ padding: "6px 12px", fontSize: "7px", cursor: "pointer" }}
                      onClick={() => {
                        setFromYear(year.toString());
                        setFromOpen(false);
                      }}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/** To Year */}
            <div style={{ position: "relative", flex: 1 }}>
              <div
                style={{
                  width: "100%",
                  padding: "6px 12px",
                  fontSize: "7px",
                  borderRadius: "4px",
                  border: "1px solid #d8d8d8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setToOpen(!toOpen)}
              >
                {toYear}
                <img src={dropdownIcon} alt="Dropdown" style={{ width: "8px", height: "8px" }} />
              </div>
              {toOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    backgroundColor: "white",
                    border: "1px solid #d8d8d8",
                    borderRadius: "4px",
                    marginTop: "2px",
                    zIndex: 10,
                    maxHeight: "100px",
                    overflowY: "auto",
                  }}
                >
                  {years.map((year) => (
                    <div
                      key={year}
                      style={{ padding: "6px 12px", fontSize: "7px", cursor: "pointer" }}
                      onClick={() => {
                        setToYear(year.toString());
                        setToOpen(false);
                      }}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          style={{
            width: "100%",
            padding: "8px 0",
            fontSize: "8px",
            fontFamily: "Poppins",
            fontWeight: "600",
            backgroundColor: "#1a1851",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
          onClick={() => {
            setField("All Fields");
            setFromYear("From Year");
            setToYear("To Year");
          }}
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
}
