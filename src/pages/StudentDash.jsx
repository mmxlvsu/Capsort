import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png"; 
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";

import "../styles/StudentDash.css";

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

  return (
    <div>
      {/* Navigation Bar */}
      <div className="nav-container">
        <div className="nav-left">
          <img src={citc} alt="CITC Logo" className="nav-logo" />
          <div className="nav-left-textbox">
            <span className="nav-left-title">Capsort</span>
            <span className="nav-left-subtitle">Capsort Archiving and Sorting System</span>
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-link nav-link-active" onClick={() => navigate("/guest")}>Projects</div>
          <div className="nav-link" onClick={() => navigate("/saved")}>Saved Projects</div>
          <div className="nav-link" onClick={() => navigate("/studentabout")}>About Us</div>

          <div className="nav-user-wrapper">
            <div className="nav-user-icon" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <img src={userImg} alt="User" className="nav-user-img" />
            </div>
            {showUserDropdown && (
              <div className="nav-user-dropdown">
                <div className="nav-user-dropdown-item" onClick={() => navigate("/login")}>
                  <img src={require("../assets/signout.png")} alt="Sign Out" className="nav-user-dropdown-icon" />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="titles">
  <div className="title-main">Capstone Projects</div>
  <div className="title-sub">0 paper found</div>
</div>

      {/* Dashboard */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <div className="sidebar-wrapper">
          <div className="sidebar-main">
            <div className="sidebar-header">
              <img src={filterIcon} alt="Filter" className="sidebar-filter-icon" />
              <h2 className="sidebar-title">Filters</h2>
            </div>

            <div className="sidebar-search">
              <label className="sidebar-label">Search</label>
              <div className="sidebar-search-wrapper">
                <img src={searchIcon} alt="Search" className="sidebar-search-icon" />
                <input type="text" placeholder="Title, Author, or keyword" className="sidebar-search-input" />
              </div>
            </div>

            {/* Fields Dropdown */}
            <div className="sidebar-dropdown-wrapper">
              <label className="sidebar-label">Fields</label>
              <div className="sidebar-dropdown" onClick={() => setFieldOpen(!fieldOpen)}>
                {field}
                <img src={dropdownIcon} alt="Dropdown" className="sidebar-dropdown-icon" />
              </div>
              {fieldOpen && (
                <div className="sidebar-dropdown-menu">
                  {["All Fields", "IoT", "Database"].map((option) => (
                    <div key={option} className="sidebar-dropdown-item" onClick={() => { setField(option); setFieldOpen(false); }}>
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Year Range */}
            <div className="sidebar-year-wrapper">
              <label className="sidebar-label">Year</label>
              <div className="sidebar-year-range">
                <div className="sidebar-dropdown-wrapper">
                  <div className="sidebar-dropdown" onClick={() => setFromOpen(!fromOpen)}>
                    {fromYear}
                    <img src={dropdownIcon} alt="Dropdown" className="sidebar-dropdown-icon" />
                  </div>
                  {fromOpen && (
                    <div className="sidebar-dropdown-menu sidebar-year-menu">
                      {years.map((year) => (
                        <div key={year} className="sidebar-dropdown-item" onClick={() => { setFromYear(year.toString()); setFromOpen(false); }}>
                          {year}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sidebar-dropdown-wrapper">
                  <div className="sidebar-dropdown" onClick={() => setToOpen(!toOpen)}>
                    {toYear}
                    <img src={dropdownIcon} alt="Dropdown" className="sidebar-dropdown-icon" />
                  </div>
                  {toOpen && (
                    <div className="sidebar-dropdown-menu sidebar-year-menu">
                      {years.map((year) => (
                        <div key={year} className="sidebar-dropdown-item" onClick={() => { setToYear(year.toString()); setToOpen(false); }}>
                          {year}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="sidebar-reset-button" onClick={() => { setField("All Fields"); setFromYear("From Year"); setToYear("To Year"); }}>
              Reset Filter
            </button>
          </div>
        </div>

        {/* Papers */}
        <div className="papers-wrapper">
          <div className="papers-container hide-scrollbar">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="paper-card">
                <div className="paper-banner" style={{ backgroundColor: index % 2 === 0 ? "#008000" : "#f1c40f" }}>
                  {index % 2 === 0 ? "IoT" : "Database"}
                </div>
                <div className="paper-title">
                  <img src={require("../assets/book.png")} alt="Book" className="paper-title-icon" />
                  {`Capstone Title ${index + 1}`}
                </div>
                <div className="paper-author">
                  <img src={require("../assets/author.png")} alt="Author" className="paper-author-icon" />
                  {`Author ${index + 1}`}
                </div>
                <div className="paper-year">
                  <img src={require("../assets/year.png")} alt="Year" className="paper-year-icon" />
                  {2025 - index}
                </div>
                <div className="paper-view-btn-container">
                  <button 
                    className="paper-view-btn" 
                    onClick={() => {
                      setPopupData({
                        title: `Capstone Title ${index + 1}`,
                        fieldName: index % 2 === 0 ? "IoT" : "Database",
                        author: `Author ${index + 1}`,
                        year: 2025 - index
                      });
                      setIsSaved(false); // reset save icon for each popup
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {popupData && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="popup-close-btn" onClick={() => setPopupData(null)}>×</button>

            <h2 className="popup-title">{popupData.title}</h2>
            <p className="popup-info">Field: {popupData.fieldName}</p>
            <p className="popup-info">Author: {popupData.author}</p>
            <p className="popup-info">Year: {popupData.year}</p>

            <div className="popup-save-wrapper">
              <span className="popup-save-text">Add to Saved</span>
              <img
                src={isSaved ? require("../assets/saved.png") : require("../assets/save.png")}
                alt="Save"
                className="popup-save-icon"
                onClick={() => {
                  setIsSaved(true);
                  setShowSavedPopup(true);
                }}
              />
            </div>
          </div>

          {showSavedPopup && (
            <div className="saved-popup-overlay" onClick={() => setShowSavedPopup(false)}>
              <div className="saved-popup-container">
                Successfully imported to your Saved Projects
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
