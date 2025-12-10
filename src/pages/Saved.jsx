import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import "../styles/Saved.css";

export default function Saved() {
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

  const SavedPapers = 20;
  const closeModal = () => setPopupData(null);

  return (
    <>
      <div className="saved-navbar">
        <div className="saved-navbar-left">
          <img src={citc} alt="CITC Logo" className="saved-navbar-logo" />
          <div className="saved-navbar-text">
            <span className="saved-navbar-title">Capsort</span>
            <span className="saved-navbar-subtitle">Capsort Archiving and Sorting System</span>
          </div>
        </div>
        <div className="saved-navbar-right">
          <div className="saved-navbar-link" onClick={() => navigate("/studentdash")}>Projects</div>
          <div className="saved-navbar-link saved-active" onClick={() => navigate("/Saved")}>Saved Projects</div>
          <div className="saved-navbar-link" onClick={() => navigate("/StudentAbout")}>About Us</div>
          <div className="saved-user-icon-container">
            <div className="saved-user-icon" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <img src={userImg} alt="User" className="saved-user-img" />
            </div>
            {showUserDropdown && (
              <div className="saved-user-dropdown">
                <div className="saved-user-dropdown-item" onClick={() => navigate("/splash")}>
                  <img src={require("../assets/signout.png")} alt="Sign Out" className="saved-user-dropdown-icon" />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="saved-papers-count-wrapper">
        <div className="saved-papers-count">
          <h2 className="saved-papers-count-title">Saved Projects Collection</h2>
          <p className="saved-papers-count-subtitle">{SavedPapers} paper found</p>
        </div>
      </div>

      <div className="saved-main-content-wrapper">
        <div className="saved-filter-sidebar">
          <div className="saved-filter-header">
            <img src={filterIcon} alt="Filter" className="saved-filter-icon" />
            <h2 className="saved-filter-title">Filters</h2>
          </div>

          <div className="saved-filter-search">
            <label className="saved-filter-label">Search</label>
            <div className="saved-filter-input-container">
              <img src={searchIcon} alt="Search" className="saved-filter-input-icon" />
              <input type="text" placeholder="Title, Author, or keyword" className="saved-filter-input" />
            </div>
          </div>

          <div className="saved-filter-fields">
            <label className="saved-filter-label">Fields</label>
            <div className="saved-filter-dropdown" onClick={() => setFieldOpen(!fieldOpen)}>
              {field} <img src={dropdownIcon} alt="Dropdown" className="saved-filter-dropdown-icon" />
            </div>
            {fieldOpen && (
              <div className="saved-filter-dropdown-list">
                {["All Fields", "IoT", "Database"].map(option => (
                  <div key={option} className="saved-filter-dropdown-item" onClick={() => { setField(option); setFieldOpen(false); }}>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="saved-filter-year">
            <label className="saved-filter-label">Year</label>
            <div className="saved-filter-year-range">
              {["from", "to"].map((type, i) => {
                const open = type === "from" ? fromOpen : toOpen;
                const setOpen = type === "from" ? setFromOpen : setToOpen;
                const value = type === "from" ? fromYear : toYear;
                const setValue = type === "from" ? setFromYear : setToYear;
                return (
                  <div key={i} className="saved-filter-year-item">
                    <div className="saved-filter-dropdown" onClick={() => setOpen(!open)}>
                      {value} <img src={dropdownIcon} alt="Dropdown" className="saved-filter-dropdown-icon" />
                    </div>
                    {open && (
                      <div className="saved-filter-dropdown-list scroll">
                        {years.map(year => (
                          <div key={year} className="saved-filter-dropdown-item" onClick={() => { setValue(year.toString()); setOpen(false); }}>
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

          <button className="saved-filter-reset-btn" onClick={() => { setField("All Fields"); setFromYear("From Year"); setToYear("To Year"); }}>
            Reset Filter
          </button>
        </div>

        <div className="saved-papers-container">
          {Array.from({ length: SavedPapers }).map((_, index) => {
            const fieldName = index % 2 === 0 ? "IoT" : "Database";
            const title = `Capstone Title ${index + 1}`;
            const year = 2025 - index;
            const author = `Author ${index + 1}`;
            return (
              <div key={index} className="saved-paper-card">
                <div className={`saved-paper-banner ${fieldName.toLowerCase()}`}>{fieldName}</div>
                <div className="saved-paper-title">
                  <img src={require("../assets/book.png")} alt="Book" className="saved-paper-icon" />
                  {title}
                </div>
                <div className="saved-paper-meta-row">
                  <img src={require("../assets/author.png")} alt="Author" className="saved-paper-meta-icon" />
                  <span className="saved-paper-meta-text">{author}</span>
                </div>
                <div className="saved-paper-meta-row">
                  <img src={require("../assets/year.png")} alt="Year" className="saved-paper-meta-icon" />
                  <span className="saved-paper-meta-text">{year}</span>
                </div>
                <div className="saved-paper-actions">
                  <button className="saved-paper-remove-btn" onClick={() => setPopupData({ isRemove: true, title })}>
                    Removed from Saves
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {popupData?.isRemove && (
        <div className="saved-view-paper-modal-overlay">
          <div className="saved-view-paper-modal">
            <p>Are you sure you want to remove <strong>{popupData.title}</strong> from your saved projects?</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "18px", marginTop: "25px" }}>
              <button className="saved-paper-remove-cancel" onClick={closeModal}>Cancel</button>
              <button className="saved-paper-remove-confirm" onClick={() => { alert(`${popupData.title} has been removed from saved projects!`); closeModal(); }}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
