import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import { projectService } from "../services/projectService";

import "../styles/Guest.css";

export default function Guest() {
  const navigate = useNavigate();
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  // Filter states
  const [field, setField] = useState("All Fields");
  const [fromYear, setFromYear] = useState("From Year");
  const [toYear, setToYear] = useState("To Year");
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldOpen, setFieldOpen] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  // Data states
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available fields (only Database and IoT)
  const availableFields = ["All Fields", "IoT", "Database"];

  // Load projects from backend
  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        field: field !== "All Fields" ? field : null,
        yearFrom: fromYear !== "From Year" ? fromYear : null,
        yearTo: toYear !== "To Year" ? toYear : null,
        search: searchQuery || null,
        limit: 100
      };

      const result = await projectService.getAllProjects(filters);
      
      if (result.error) {
        setError(result.message || 'Failed to load projects');
        setProjects([]);
      } else {
        setProjects(result.data.projects || []);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [field, fromYear, toYear, searchQuery]);

  // Load projects on component mount and when filters change
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Reset filters
  const resetFilters = () => {
    setField("All Fields");
    setFromYear("From Year");
    setToYear("To Year");
    setSearchQuery("");
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="guest-navbar">
        <div className="guest-navbar-left">
          <img 
            src={citc} 
            alt="CITC Logo" 
            className="guest-navbar-logo" 
            onClick={() => navigate("/splash")}
            style={{ cursor: 'pointer' }}
          />
          <div className="guest-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }}>
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
          <p className="guest-papers-count-subtitle">
            {loading ? 'Loading...' : `${projects.length} paper${projects.length !== 1 ? 's' : ''} found`}
          </p>
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
                value={searchQuery}
                onChange={handleSearchChange}
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
                {availableFields.map(option => (
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
            onClick={resetFilters}
          >
            Reset Filter
          </button>
        </div>

        {/* PAPERS */}
        <div className="guest-papers-container">
          {loading ? (
            <div className="guest-loading">
              <p>Loading projects...</p>
            </div>
          ) : error ? (
            <div className="guest-error">
              <p>Error: {error}</p>
              <button onClick={loadProjects} className="guest-retry-btn">
                Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="guest-no-projects">
              <p>No projects found. Try adjusting your filters.</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="guest-paper-card">
                <div className={`guest-paper-banner ${project.field.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
                  {project.field}
                </div>

                <div className="guest-paper-title">
                  <img src={require("../assets/book.png")} alt="Book" className="guest-paper-icon" />
                  {project.title}
                </div>

                <div className="guest-paper-meta-row">
                  <img src={require("../assets/author.png")} alt="Author" className="guest-paper-meta-icon" />
                  <span className="guest-paper-meta-text">{project.author}</span>
                </div>

                <div className="guest-paper-meta-row">
                  <img src={require("../assets/year.png")} alt="Year" className="guest-paper-meta-icon" />
                  <span className="guest-paper-meta-text">{project.year}</span>
                </div>

                <div className="guest-paper-meta-row">
                  <img src={require("../assets/user.png")} alt="Uploader" className="guest-paper-meta-icon" />
                  <span className="guest-paper-meta-text">
                    {project.uploader ? project.uploader.fullName : 'Unknown'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
