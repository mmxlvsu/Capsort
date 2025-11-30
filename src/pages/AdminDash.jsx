import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import addIcon from "../assets/add.png";

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

  const [popupData, setPopupData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  const inputStyle = {
    padding: "6px",
    fontSize: "12px",
    borderRadius: "4px",
    border: "1px solid #d8d8d8",
  };

  const saveButtonStyle = {
    backgroundColor: "#1a1851",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <>
      {/* Navbar */}
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

        {/* Right Navigation */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div
            style={{ borderBottom: "1px solid black", fontWeight: "700", cursor: "pointer" }}
            onClick={() => navigate("/guest")}
          >
            Projects
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/adminanalytics")}>
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

      {/* Add New Paper Button */}
      <div
        style={{
          position: "absolute",
          top: "61px",
          right: "50px",
          display: "flex",
          alignItems: "center",
          gap: "9px",
          fontFamily: "Poppins",
          fontSize: "10px",
          fontWeight: 600,
          color: "white",
          backgroundColor: "#1a1851",
          padding: "6px 20px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => setPopupData({ isNew: true })}
      >
        <img src={addIcon} alt="Add" style={{ width: "11px", height: "10px", filter: "invert(100%)" }} />
        Add new paper
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                <img
                  src={require("../assets/book.png")}
                  alt="Book"
                  style={{ width: "18px", height: "18px" }}
                />
                {title}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "10px",
                  color: "#6A6A6A",
                }}
              >
                <img
                  src={require("../assets/author.png")}
                  alt="Author"
                  style={{ width: "12px", height: "12px" }}
                />{" "}
                {author}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "10px",
                  color: "#6A6A6A",
                }}
              >
                <img
                  src={require("../assets/year.png")}
                  alt="Year"
                  style={{ width: "12px", height: "12px" }}
                />{" "}
                {year}
              </div>

              {/* View Button */}
              <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "0.5px solid black",
                    borderRadius: "4px",
                    padding: "4px 18px",
                    fontSize: "9px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => setPopupData({ title, fieldName, year, author })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1a1851";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.fontWeight = "bold";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "black";
                  }}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Modal */}
      {popupData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              width: "400px",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              position: "relative",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => setPopupData(null)}
            >
              ×
            </button>

            {popupData.isNew ? (
              <>
                <h2 style={{ fontSize: "14px", fontWeight: 600 }}>Add Capstone Paper</h2>
                <input type="text" placeholder="Title" style={inputStyle} />
                <input type="text" placeholder="Author" style={inputStyle} />
                <input type="text" placeholder="Field" style={inputStyle} />
                <input type="number" placeholder="Year" style={inputStyle} />
                <button
                  style={saveButtonStyle}
                  onClick={() => {
                    console.log("Save new paper");
                    setPopupData(null);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: "12px", fontWeight: 600 }}>{popupData.title}</h2>
                <p style={{ fontSize: "12px" }}>Field: {popupData.fieldName}</p>
                <p style={{ fontSize: "12px" }}>Author: {popupData.author}</p>
                <p style={{ fontSize: "12px" }}>Year: {popupData.year}</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "10px",
                  }}
                >
                  <span style={{ fontSize: "11px", fontWeight: 500 }}>Add to Saved</span>
                  <img
                    src={require("../assets/save.png")}
                    alt="Save"
                    style={{ width: "15px", height: "15px", cursor: "pointer" }}
                    onMouseEnter={(e) => {
                      if (!isSaved) e.currentTarget.src = require("../assets/saved.png");
                    }}
                    onMouseLeave={(e) => {
                      if (!isSaved) e.currentTarget.src = require("../assets/save.png");
                    }}
                    onClick={() => {
                      setIsSaved(true);
                      setShowSavedPopup(true);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Saved Confirmation Popup */}
      {showSavedPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3000,
          }}
          onClick={() => setShowSavedPopup(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px 30px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#1a1851",
            }}
          >
            Successfully imported to your Saved Projects
          </div>
        </div>
      )}

      {/* Filter Sidebar */}
      <div
        style={{
          position: "absolute",
          top: "65px",
          left: "20px",
          width: "22%",
          height: "auto",
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
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={filterIcon} alt="Filter" style={{ width: "12px", height: "12px" }} />
          <h2 style={{ fontFamily: "Poppins", fontSize: "10px", fontWeight: "500", color: "#1a1851" }}>
            Filters
          </h2>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "-15px" }}>
          <label style={{ fontFamily: "Poppins", fontSize: "8px", color: "#000" }}>Year</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {/* From Year */}
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

            {/* To Year */}
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
    </>
  );
}
