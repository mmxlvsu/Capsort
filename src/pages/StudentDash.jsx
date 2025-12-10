import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";

import "../styles/StudentDash.css";

export default function NavigationBar() {
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

  const closeModal = () => setPopupData(null);

  const totalPapers = 20;

  return (
    <>
      {/* NAVBAR */}
      <div className="studentdash-navbar">
        <div className="studentdash-navbar-left">
          <img src={citc} alt="CITC Logo" className="studentdash-navbar-logo" />
          <div className="studentdash-navbar-text">
            <span className="studentdash-navbar-title">Capsort</span>
            <span className="studentdash-navbar-subtitle">
              Capsort Archiving and Sorting System
            </span>
          </div>
        </div>

        <div className="studentdash-navbar-right">
          <div
            className="studentdash-navbar-link studentdash-active"
            onClick={() => navigate("/studentdash")}
          >
            Projects
          </div>
          <div
            className="studentdash-navbar-link"
            onClick={() => navigate("/Saved")}
          >
            Saved Projects
          </div>
          <div
            className="studentdash-navbar-link"
            onClick={() => navigate("/StudentAbout")}
          >
            About Us
          </div>
          <div className="studentdash-user-icon-container">
            <div
              className="studentdash-user-icon"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <img src={userImg} alt="User" className="studentdash-user-img" />
            </div>

            {showUserDropdown && (
              <div className="studentdash-user-dropdown">
                <div
                  className="studentdash-user-dropdown-item"
                  onClick={() => navigate("/splash")}
                >
                  <img
                    src={require("../assets/signout.png")}
                    alt="Sign Out"
                    className="studentdash-user-dropdown-icon"
                  />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Capstone Papers Text */}
      <div className="studentdash-papers-count-wrapper">
        <div className="studentdash-papers-count">
          <h2 className="studentdash-papers-count-title">Capstone Papers</h2>
          <p className="studentdash-papers-count-subtitle">{totalPapers} paper found</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="studentdash-main-content-wrapper">
        {/* FILTER SIDEBAR */}
        <div className="studentdash-filter-sidebar">
          <div className="studentdash-filter-header">
            <img src={filterIcon} alt="Filter" className="studentdash-filter-icon" />
            <h2 className="studentdash-filter-title">Filters</h2>
          </div>

          <div className="studentdash-filter-search">
            <label className="studentdash-filter-label">Search</label>
            <div className="studentdash-filter-input-container">
              <img src={searchIcon} alt="Search" className="studentdash-filter-input-icon" />
              <input
                type="text"
                placeholder="Title, Author, or keyword"
                className="studentdash-filter-input"
              />
            </div>
          </div>

          <div className="studentdash-filter-fields">
            <label className="studentdash-filter-label">Fields</label>
            <div className="studentdash-filter-dropdown" onClick={() => setFieldOpen(!fieldOpen)}>
              {field} <img src={dropdownIcon} alt="Dropdown" className="studentdash-filter-dropdown-icon" />
            </div>
            {fieldOpen && (
              <div className="studentdash-filter-dropdown-list">
                {["All Fields", "IoT", "Database"].map(option => (
                  <div
                    key={option}
                    className="studentdash-filter-dropdown-item"
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

          <div className="studentdash-filter-year">
            <label className="studentdash-filter-label">Year</label>
            <div className="studentdash-filter-year-range">
              {["from", "to"].map((type, i) => {
                const open = type === "from" ? fromOpen : toOpen;
                const setOpen = type === "from" ? setFromOpen : setToOpen;
                const value = type === "from" ? fromYear : toYear;
                const setValue = type === "from" ? setFromYear : setToYear;

                return (
                  <div key={i} className="studentdash-filter-year-item">
                    <div className="studentdash-filter-dropdown" onClick={() => setOpen(!open)}>
                      {value} <img src={dropdownIcon} alt="Dropdown" className="studentdash-filter-dropdown-icon" />
                    </div>
                    {open && (
                      <div className="studentdash-filter-dropdown-list scroll">
                        {years.map(year => (
                          <div
                            key={year}
                            className="studentdash-filter-dropdown-item"
                            onClick={() => {
                              setValue(year.toString());
                              setOpen(false);
                            }}
                          >
                            {year}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="studentdash-filter-reset-btn"
            onClick={() => {
              setField("All Fields");
              setFromYear("From Year");
              setToYear("To Year");
            }}
          >
            Reset Filter
          </button>
        </div>

        {/* PAPERS */}
        <div className="studentdash-papers-container">
          {Array.from({ length: totalPapers }).map((_, index) => {
            const fieldName = index % 2 === 0 ? "IoT" : "Database";
            const title = `Capstone Title ${index + 1}`;
            const year = 2025 - index;
            const author = `Author ${index + 1}`;

            return (
              <div key={index} className="studentdash-paper-card">
                <div className={`studentdash-paper-banner ${fieldName.toLowerCase()}`}>{fieldName}</div>

                <div className="studentdash-paper-title">
                  <img src={require("../assets/book.png")} alt="Book" className="studentdash-paper-icon" />
                  {title}
                </div>

                <div className="studentdash-paper-meta-row">
                  <img src={require("../assets/author.png")} alt="Author" className="studentdash-paper-meta-icon" />
                  <span className="studentdash-paper-meta-text">{author}</span>
                </div>

                <div className="studentdash-paper-meta-row">
                  <img src={require("../assets/year.png")} alt="Year" className="studentdash-paper-meta-icon" />
                  <span className="studentdash-paper-meta-text">{year}</span>
                </div>

                {/* VIEW & SAVE BUTTONS */}
                <div className="studentdash-paper-actions">
                  <div
                    className="studentdash-paper-view-btn"
                    onClick={() =>
                      setPopupData({ isView: true, title, author, year, field: fieldName })
                    }
                  >
                    View Paper
                  </div>

                  <div
                    className="studentdash-paper-save-btn"
                    onClick={() => alert(`${title} has been saved!`)}
                  >
                    Save
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VIEW PAPER MODAL */}
      {popupData?.isView && (
        <div className="studentdash-view-paper-modal-overlay">
          <div className="studentdash-view-paper-modal">
            {/* Close button top-right */}
            <button
              className="studentdash-view-paper-modal-close"
              onClick={closeModal}
            >
              ✕
            </button>

            <h2 className="studentdash-view-paper-modal-title">{popupData.title}</h2>
            <p className="studentdash-view-paper-modal-subtitle">
              Details of the capstone paper.
            </p>

            <p><strong>Author:</strong> {popupData.author}</p>
            <p><strong>Year:</strong> {popupData.year}</p>
            <p><strong>Field:</strong> {popupData.field}</p>

            <div className="studentdash-view-paper-modal-buttons">
              <button
                className="studentdash-paper-save-btn-modal"
                onClick={() => {
                  alert(`${popupData.title} has been saved!`);
                  closeModal();
                }}
              >
                <img src={require("../assets/save.png")} alt="Save" />
                Save Paper
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
