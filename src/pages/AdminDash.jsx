import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import addIcon from "../assets/add.png";

import "../styles/AdminDash.css";

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
  const [showTrashConfirm, setShowTrashConfirm] = useState(false);
  const [popupData, setPopupData] = useState(null);

  return (
    <>
      {/* NAVBAR */}
      <div className="admndash-navbar">
        <div className="admndash-navbar-left">
          <img src={citc} alt="CITC Logo" className="admndash-navbar-logo" />
          <div className="admndash-navbar-text">
            <span className="admndash-navbar-title">Capsort</span>
            <span className="admndash-navbar-subtitle">
              Capsort Archiving and Sorting System
            </span>
          </div>
        </div>

        <div className="admndash-navbar-right">
          <div
            className="admndash-navbar-link admndash-active"
            onClick={() => navigate("/admindash")}
          >
            Projects
          </div>
          <div
            className="admndash-navbar-link"
            onClick={() => navigate("/adminanalytics")}
          >
            Analytics
          </div>

          <div className="admndash-user-icon-container">
            <div
              className="admndash-user-icon"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <img src={userImg} alt="User" className="admndash-user-img" />
            </div>

            {showUserDropdown && (
              <div className="admndash-user-dropdown">
                <div
                  className="admndash-user-dropdown-item"
                  onClick={() => navigate("/splash")}
                >
                  <img
                    src={require("../assets/signout.png")}
                    alt="Sign Out"
                    className="admndash-user-dropdown-icon"
                  />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADD PAPER BUTTON */}
      <div className="admndash-add-paper-btn-wrapper">
        <div
          className="admndash-add-paper-btn"
          onClick={() => setPopupData({ isNew: true })}
        >
          <img src={addIcon} alt="Add" className="admndash-add-paper-icon" />
          Add new paper
        </div>
      </div>

      {/* MAIN CONTENT: FILTER + PAPERS */}
      <div className="admndash-main-content-wrapper">
        {/* FILTER SIDEBAR */}
        <div className="admndash-filter-sidebar">
          <div className="admndash-filter-header">
            <img src={filterIcon} alt="Filter" className="admndash-filter-icon" />
            <h2 className="admndash-filter-title">Filters</h2>
          </div>

          <div className="admndash-filter-search">
            <label className="admndash-filter-label">Search</label>
            <div className="admndash-filter-input-container">
              <img src={searchIcon} alt="Search" className="admndash-filter-input-icon" />
              <input
                type="text"
                placeholder="Title, Author, or keyword"
                className="admndash-filter-input"
              />
            </div>
          </div>

          <div className="admndash-filter-fields">
            <label className="admndash-filter-label">Fields</label>
            <div className="admndash-filter-dropdown" onClick={() => setFieldOpen(!fieldOpen)}>
              {field} <img src={dropdownIcon} alt="Dropdown" className="admndash-filter-dropdown-icon" />
            </div>
            {fieldOpen && (
              <div className="admndash-filter-dropdown-list">
                {["All Fields", "IoT", "Database"].map(option => (
                  <div
                    key={option}
                    className="admndash-filter-dropdown-item"
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

          <div className="admndash-filter-year">
            <label className="admndash-filter-label">Year</label>
            <div className="admndash-filter-year-range">
              {["from", "to"].map((type, i) => {
                const open = type === "from" ? fromOpen : toOpen;
                const setOpen = type === "from" ? setFromOpen : setToOpen;
                const value = type === "from" ? fromYear : toYear;
                const setValue = type === "from" ? setFromYear : setToYear;

                return (
                  <div key={i} className="admndash-filter-year-item">
                    <div className="admndash-filter-dropdown" onClick={() => setOpen(!open)}>
                      {value} <img src={dropdownIcon} alt="Dropdown" className="admndash-filter-dropdown-icon" />
                    </div>
                    {open && (
                      <div className="admndash-filter-dropdown-list scroll">
                        {years.map(year => (
                          <div
                            key={year}
                            className="admndash-filter-dropdown-item"
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
            className="admndash-filter-reset-btn"
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
        <div className="admndash-papers-container">
          {Array.from({ length: 20 }).map((_, index) => {
            const fieldName = index % 2 === 0 ? "IoT" : "Database";
            const title = `Capstone Title ${index + 1}`;
            const year = 2025 - index;
            const author = `Author ${index + 1}`;

            return (
              <div key={index} className="admndash-paper-card">
                <div className={`admndash-paper-banner ${fieldName.toLowerCase()}`}>{fieldName}</div>

                <div className="admndash-paper-title">
                  <img src={require("../assets/book.png")} alt="Book" className="admndash-paper-icon" />
                  {title}
                </div>

                <div className="admndash-paper-meta-row">
                  <img src={require("../assets/author.png")} alt="Author" className="admndash-paper-meta-icon" />
                  <span className="admndash-paper-meta-text">{author}</span>
                </div>

                <div className="admndash-paper-meta-row">
                  <img src={require("../assets/year.png")} alt="Year" className="admndash-paper-meta-icon" />
                  <span className="admndash-paper-meta-text">{year}</span>
                </div>

                <div
                  className="admndash-paper-edit-btn"
                  onClick={() =>
                    setPopupData({ isEdit: true, title, author, year, field: fieldName })
                  }
                >
                  <img src={require("../assets/edit.png")} alt="Edit" className="admndash-paper-edit-icon" />
                  Edit Paper
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {popupData?.isEdit && (
        <div className="admndash-add-paper-modal-overlay">
          <div className="admndash-add-paper-modal">
            <h2 className="admndash-add-paper-modal-title">Edit Capstone Paper</h2>
            <p className="admndash-add-paper-modal-subtitle">Update the details of the capstone paper.</p>

            <label>Title</label>
            <input type="text" placeholder="Enter paper title" className="admndash-add-paper-modal-input" />
            <label>Author</label>
            <input type="text" placeholder="Enter author name" className="admndash-add-paper-modal-input" />
            <label>Year</label>
            <input type="text" placeholder="2025" inputMode="numeric" className="admndash-add-paper-modal-input" />
            <label>Field</label>
            <select className="admndash-add-paper-modal-input">
              <option value="">Select Field</option>
              <option value="IoT">IoT</option>
              <option value="Database">Database</option>
            </select>

            <div className="admndash-add-paper-modal-buttons">
              <button className="admndash-add-paper-modal-trash" onClick={() => setShowTrashConfirm(true)}>Move to Trash</button>
              <button className="admndash-add-paper-modal-submit">Save Changes</button>
            </div>

            {showTrashConfirm && (
              <div className="admndash-trash-confirm-overlay">
                <div className="admndash-trash-confirm-modal">
                  <p>Are you sure you want to move this paper to trash?</p>
                  <div className="admndash-trash-confirm-buttons">
                    <button className="admndash-trash-cancel" onClick={() => setShowTrashConfirm(false)}>Cancel</button>
                    <button className="admndash-trash-confirm" onClick={() => { setPopupData(null); setShowTrashConfirm(false); }}>Yes, Move to Trash</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {popupData?.isNew && (
        <div className="admndash-add-paper-modal-overlay">
          <div className="admndash-add-paper-modal">
            <h2 className="admndash-add-paper-modal-title">Add Capstone Paper</h2>
            <p className="admndash-add-paper-modal-subtitle">Enter the details of the capstone paper to add it to the repository.</p>

            <label>Title</label>
            <input type="text" placeholder="Enter paper title" className="admndash-add-paper-modal-input" />
            <label>Author</label>
            <input type="text" placeholder="Enter author name" className="admndash-add-paper-modal-input" />
            <label>Year</label>
            <input type="text" placeholder="2025" inputMode="numeric" className="admndash-add-paper-modal-input" />
            <label>Field</label>
            <select className="admndash-add-paper-modal-input">
              <option value="">Select Field</option>
              <option value="IoT">IoT</option>
              <option value="Database">Database</option>
            </select>

            <div className="admndash-add-paper-modal-buttons">
              <button className="admndash-add-paper-modal-cancel" onClick={() => setPopupData(null)}>Cancel</button>
              <button className="admndash-add-paper-modal-submit">Add Paper</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
