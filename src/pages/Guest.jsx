import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";

import "../styles/Guest.css";

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

  const totalPapers = 20;

  return (
    <>
      {/* NAVBAR */}
      <div className="guest-navbar">
        <div className="guest-navbar-left">
          <img src={citc} alt="CITC Logo" className="guest-navbar-logo" />
          <div className="guest-navbar-text">
            <span className="guest-navbar-title">Capsort</span>
            <span className="guest-navbar-subtitle">
              Capsort Archiving and Sorting System
            </span>
          </div>
        </div>

        <div className="guest-navbar-right">
          <div
            className="guest-navbar-link guest-active"
            onClick={() => navigate("/guest")}
          >
            Projects
          </div>
          <div
            className="guest-navbar-link"
            onClick={() => navigate("/guestabout")}
          >
            About Us
          </div>
        </div>
      </div>

      {/* Capstone Papers Text */}
      <div className="guest-papers-count-wrapper">
        <div className="guest-papers-count">
          <h2 className="guest-papers-count-title">Capstone Papers</h2>
          <p className="guest-papers-count-subtitle">{totalPapers} paper found</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="guest-main-content-wrapper">
        {/* FILTER SIDEBAR */}
        <div className="guest-filter-sidebar">
          <div className="guest-filter-header">
            <img src={filterIcon} alt="Filter" className="guest-filter-icon" />
            <h2 className="guest-filter-title">Filters</h2>
          </div>

          <div className="guest-filter-search">
            <label className="guest-filter-label">Search</label>
            <div className="guest-filter-input-container">
              <img src={searchIcon} alt="Search" className="guest-filter-input-icon" />
              <input
                type="text"
                placeholder="Title, Author, or keyword"
                className="guest-filter-input"
              />
            </div>
          </div>

          <div className="guest-filter-fields">
            <label className="guest-filter-label">Fields</label>
            <div className="guest-filter-dropdown" onClick={() => setFieldOpen(!fieldOpen)}>
              {field} <img src={dropdownIcon} alt="Dropdown" className="guest-filter-dropdown-icon" />
            </div>
            {fieldOpen && (
              <div className="guest-filter-dropdown-list">
                {["All Fields", "IoT", "Database"].map(option => (
                  <div
                    key={option}
                    className="guest-filter-dropdown-item"
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

          <div className="guest-filter-year">
            <label className="guest-filter-label">Year</label>
            <div className="guest-filter-year-range">
              {["from", "to"].map((type, i) => {
                const open = type === "from" ? fromOpen : toOpen;
                const setOpen = type === "from" ? setFromOpen : setToOpen;
                const value = type === "from" ? fromYear : toYear;
                const setValue = type === "from" ? setFromYear : setToYear;

                return (
                  <div key={i} className="guest-filter-year-item">
                    <div className="guest-filter-dropdown" onClick={() => setOpen(!open)}>
                      {value} <img src={dropdownIcon} alt="Dropdown" className="guest-filter-dropdown-icon" />
                    </div>
                    {open && (
                      <div className="guest-filter-dropdown-list scroll">
                        {years.map(year => (
                          <div
                            key={year}
                            className="guest-filter-dropdown-item"
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
            className="guest-filter-reset-btn"
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
        <div className="guest-papers-container">
          {Array.from({ length: totalPapers }).map((_, index) => {
            const fieldName = index % 2 === 0 ? "IoT" : "Database";
            const title = `Capstone Title ${index + 1}`;
            const year = 2025 - index;
            const author = `Author ${index + 1}`;

            return (
              <div key={index} className="guest-paper-card">
                <div className={`guest-paper-banner ${fieldName.toLowerCase()}`}>{fieldName}</div>

                <div className="guest-paper-title">
                  <img src={require("../assets/book.png")} alt="Book" className="guest-paper-icon" />
                  {title}
                </div>

                <div className="guest-paper-meta-row">
                  <img src={require("../assets/author.png")} alt="Author" className="guest-paper-meta-icon" />
                  <span className="guest-paper-meta-text">{author}</span>
                </div>

                <div className="guest-paper-meta-row">
                  <img src={require("../assets/year.png")} alt="Year" className="guest-paper-meta-icon" />
                  <span className="guest-paper-meta-text">{year}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
