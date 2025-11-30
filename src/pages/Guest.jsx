import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import citc from "../assets/citc.png";
import "../styles/Guest.css";

export default function FilterSidebarUI() {
  const navigate = useNavigate();
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  const [field, setField] = useState("All Fields");
  const [fromYear, setFromYear] = useState("From Year");
  const [toYear, setToYear] = useState("To Year");
  const [fieldOpen, setFieldOpen] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState("Projects");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "About Us") navigate("/guestabout");
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <div className="guest-nav">
        <div className="guest-nav-left">
          <img src={citc} className="guest-nav-left-logo" />
          <div className="guest-nav-left-text">
            <span>Capsort</span>
            <span>Capsort Archiving and Sorting System</span>
          </div>
        </div>

        <div className="guest-nav-right">
          {["Projects", "About Us"].map((tab) => (
            <div
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Page Title */}
      <div className="page-header">
        <div className="page-title">
          {activeTab === "Projects" ? "Capstone Projects" : "About Us"}
        </div>
        <div className="page-subtitle">
          {activeTab === "Projects" ? "0 papers found" : ""}
        </div>
      </div>

      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <img src={filterIcon} className="sidebar-icon" />
            <h2 className="sidebar-title">Filters</h2>
          </div>

          {/* Search */}
          <label className="label">Search</label>
          <div className="input-container">
            <img src={searchIcon} className="input-icon" />
            <input className="input" placeholder="Title, Author, or keyword" />
          </div>

          {/* Field Dropdown */}
          <label className="label">Fields</label>
          <div className="dropdown" onClick={() => setFieldOpen(!fieldOpen)}>
            {field}
            <img src={dropdownIcon} className="dropdown-icon" />
          </div>
          {fieldOpen && (
            <div className="dropdown-list">
              {["All Fields", "IoT", "Database"].map((option) => (
                <div
                  key={option}
                  className="dropdown-item"
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

          {/* Year Filters */}
          <label className="label">Year</label>
          <div className="year-row">
            {/* From */}
            <div className="dropdown" onClick={() => setFromOpen(!fromOpen)}>
              {fromYear}
              <img src={dropdownIcon} className="dropdown-icon" />
            </div>
            {fromOpen && (
              <div className="dropdown-list tall">
                {years.map((year) => (
                  <div
                    key={year}
                    className="dropdown-item"
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

            {/* To */}
            <div className="dropdown" onClick={() => setToOpen(!toOpen)}>
              {toYear}
              <img src={dropdownIcon} className="dropdown-icon" />
            </div>
            {toOpen && (
              <div className="dropdown-list tall">
                {years.map((year) => (
                  <div
                    key={year}
                    className="dropdown-item"
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

          {/* Reset */}
          <button className="reset-btn"
            onClick={() => {
              setField("All Fields");
              setFromYear("From Year");
              setToYear("To Year");
            }}>
            Reset Filter
          </button>
        </div>

        {/* Cards */}
        <div className="cards-container">
          {Array.from({ length: 20 }).map((_, index) => {
            const field = index % 2 === 0 ? "IoT" : "Database";
            const bannerColor = field === "IoT" ? "#008000" : "#f1c40f";

            return (
              <div key={index} className="card">
  {/* Banner */}
  <div className="card-banner" style={{ backgroundColor: bannerColor }}>
    {field}
  </div>

                <div className="card-title">
                  <img src={require("../assets/book.png")} className="card-icon" />
                  Capstone Title {index + 1}
                </div>

                <div className="card-meta">
                  <img src={require("../assets/author.png")} className="meta-icon" />
                  Author:
                </div>

                <div className="card-meta">
                  <img src={require("../assets/year.png")} className="meta-icon" />
                  Year:
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
