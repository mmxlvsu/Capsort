import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import { projectService } from "../services/projectService";
import { savedProjectService } from "../services/savedProjectService";

import "../styles/StudentDash.css";

export default function StudentDash() {
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
  
  // UI states
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [popupData, setPopupData] = useState(null);
  
  // Data states
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedProjects, setSavedProjects] = useState(new Set());
  const [savingProjects, setSavingProjects] = useState(new Set());

  // Available fields (expanded list)
  const availableFields = ["All Fields", "IoT", "Database"];

  const closeModal = () => setPopupData(null);

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

  // Load saved projects to track which ones are saved
  const loadSavedProjects = useCallback(async () => {
    try {
      const result = await savedProjectService.getSavedProjects({ limit: 1000 });
      if (!result.error && result.data.savedProjects) {
        const savedIds = new Set(result.data.savedProjects.map(saved => saved.project.id));
        setSavedProjects(savedIds);
      }
    } catch (err) {
      console.error('Failed to load saved projects:', err);
    }
  }, []);

  // Load projects and saved projects on component mount and when filters change
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    loadSavedProjects();
  }, [loadSavedProjects]);

  // Handle save/unsave project
  const handleSaveProject = async (projectId, projectTitle) => {
    try {
      setSavingProjects(prev => new Set([...prev, projectId]));
      
      const isSaved = savedProjects.has(projectId);
      
      if (isSaved) {
        // Unsave project
        const result = await savedProjectService.unsaveProject(projectId);
        if (result.error) {
          alert(result.message || 'Failed to remove project from saved');
        } else {
          setSavedProjects(prev => {
            const newSet = new Set(prev);
            newSet.delete(projectId);
            return newSet;
          });
          alert(`${projectTitle} has been removed from saved projects!`);
        }
      } else {
        // Save project
        const result = await savedProjectService.saveProject(projectId);
        if (result.error) {
          alert(result.message || 'Failed to save project');
        } else {
          setSavedProjects(prev => new Set([...prev, projectId]));
          alert(`${projectTitle} has been saved!`);
        }
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setSavingProjects(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

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
      <div className="studentdash-navbar">
        <div className="studentdash-navbar-left">
          <img 
            src={citc} 
            alt="CITC Logo" 
            className="studentdash-navbar-logo" 
            onClick={() => navigate("/splash")}
            style={{ cursor: 'pointer' }}
          />
          <div className="studentdash-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }}>
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
          <p className="studentdash-papers-count-subtitle">
            {loading ? 'Loading...' : `${projects.length} paper${projects.length !== 1 ? 's' : ''} found`}
          </p>
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
                value={searchQuery}
                onChange={handleSearchChange}
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
                {availableFields.map(option => (
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
            onClick={resetFilters}
          >
            Reset Filter
          </button>
        </div>

        {/* PAPERS */}
        <div className="studentdash-papers-container">
          {loading ? (
            <div className="studentdash-loading">
              <p>Loading projects...</p>
            </div>
          ) : error ? (
            <div className="studentdash-error">
              <p>Error: {error}</p>
              <button onClick={loadProjects} className="studentdash-retry-btn">
                Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="studentdash-no-projects">
              <p>No projects found. Try adjusting your filters.</p>
            </div>
          ) : (
            projects.map((project) => {
              const isSaved = savedProjects.has(project.id);
              const isSaving = savingProjects.has(project.id);
              
              return (
                <div key={project.id} className="studentdash-paper-card">
                  <div className={`studentdash-paper-banner ${project.field.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
                    {project.field}
                  </div>

                  <div className="studentdash-paper-title">
                    <img src={require("../assets/book.png")} alt="Book" className="studentdash-paper-icon" />
                    {project.title}
                  </div>

                  <div className="studentdash-paper-meta-row">
                    <img src={require("../assets/author.png")} alt="Author" className="studentdash-paper-meta-icon" />
                    <span className="studentdash-paper-meta-text">{project.author}</span>
                  </div>

                  <div className="studentdash-paper-meta-row">
                    <img src={require("../assets/year.png")} alt="Year" className="studentdash-paper-meta-icon" />
                    <span className="studentdash-paper-meta-text">{project.year}</span>
                  </div>

                  <div className="studentdash-paper-meta-row">
                    <img src={require("../assets/user.png")} alt="Uploader" className="studentdash-paper-meta-icon" />
                    <span className="studentdash-paper-meta-text">
                      {project.uploader ? project.uploader.fullName : 'Unknown'}
                    </span>
                  </div>

                  {/* SAVE BUTTON (removed View button as requested) */}
                  <div className="studentdash-paper-actions">
                    <div
                      className={`studentdash-paper-save-btn ${isSaved ? 'saved' : ''}`}
                      onClick={() => !isSaving && handleSaveProject(project.id, project.title)}
                      style={{ 
                        opacity: isSaving ? 0.6 : 1,
                        cursor: isSaving ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isSaving ? 'Processing...' : isSaved ? 'Unsave' : 'Save'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>


    </>
  );
}
