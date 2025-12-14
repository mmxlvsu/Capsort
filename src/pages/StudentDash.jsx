import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import bookIcon from "../assets/book.png";
import authorIcon from "../assets/author.png";
import yearIcon from "../assets/year.png";

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
  
  // Data states
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedProjects, setSavedProjects] = useState(new Set());
  const [savingProjects, setSavingProjects] = useState(new Set());

  const availableFields = ["All Fields", "IoT", "Database"];

  const resetFilters = () => {
    setField("All Fields");
    setFromYear("From Year");
    setToYear("To Year");
    setSearchQuery("");
  };

  // Load projects
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
        setError(result.message || "Failed to load projects");
        setProjects([]);
      } else {
        setProjects(result.data.projects || []);
      }
    } catch {
      setError("Network error. Please check your connection.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [field, fromYear, toYear, searchQuery]);

  // Load saved projects
  const loadSavedProjects = useCallback(async () => {
    try {
      const result = await savedProjectService.getSavedProjects({ limit: 1000 });
      if (!result.error && result.data.savedProjects) {
        const savedIds = new Set(result.data.savedProjects.map(s => s.project.id));
        setSavedProjects(savedIds);
      }
    } catch (err) {
      console.error("Failed to load saved projects:", err);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    loadSavedProjects();
  }, [loadSavedProjects]);

  // Save/Unsave project
  const handleSaveProject = async (projectId, projectTitle) => {
    try {
      setSavingProjects(prev => new Set([...prev, projectId]));
      const isSaved = savedProjects.has(projectId);

      if (isSaved) {
        const result = await savedProjectService.unsaveProject(projectId);
        if (!result.error) {
          setSavedProjects(prev => {
            const newSet = new Set(prev);
            newSet.delete(projectId);
            return newSet;
          });
          alert(`${projectTitle} has been removed from saved projects!`);
        } else {
          alert(result.message || "Failed to remove project from saved");
        }
      } else {
        const result = await savedProjectService.saveProject(projectId);
        if (!result.error) {
          setSavedProjects(prev => new Set([...prev, projectId]));
          alert(`${projectTitle} has been saved!`);
        } else {
          alert(result.message || "Failed to save project");
        }
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSavingProjects(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="studentdash-navbar">
        <div className="studentdash-navbar-left">
          <img src={citc} alt="CITC Logo" className="studentdash-navbar-logo" onClick={() => navigate("/splash")} style={{ cursor: "pointer" }} />
          <div className="studentdash-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: "pointer" }}>
            <span className="studentdash-navbar-title">Capsort</span>
            <span className="studentdash-navbar-subtitle">Capsort Archiving and Sorting System</span>
          </div>
        </div>

        <div className="studentdash-navbar-right">
          <div className="studentdash-navbar-link studentdash-active" onClick={() => navigate("/studentdash")}>Projects</div>
          <div className="studentdash-navbar-link" onClick={() => navigate("/Saved")}>Saved Projects</div>
          <div className="studentdash-navbar-link" onClick={() => navigate("/StudentAbout")}>About Us</div>
          <div className="studentdash-user-icon-container">
            <div className="studentdash-user-icon" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <img src={userImg} alt="User" className="studentdash-user-img" />
            </div>
            {showUserDropdown && (
              <div className="studentdash-user-dropdown">
                <div className="studentdash-user-dropdown-item" onClick={() => navigate("/splash")}>
                  <img src={require("../assets/signout.png")} alt="Sign Out" className="studentdash-user-dropdown-icon" />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PAPERS COUNT */}
      <div className="studentdash-papers-count-wrapper">
        <div className="studentdash-papers-count">
          <h2 className="studentdash-papers-count-title">Capstone Papers</h2>
          <p className="studentdash-papers-count-subtitle">
            {loading ? "Loading..." : `${projects.length} paper${projects.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="studentdash-main-content-wrapper">
        {/* FILTERS */}
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
                onChange={e => setSearchQuery(e.target.value)}
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
                  <div key={option} className="studentdash-filter-dropdown-item" onClick={() => { setField(option); setFieldOpen(false); }}>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="studentdash-filter-reset-btn" onClick={resetFilters}>Reset Filter</button>
        </div>

        {/* PROJECT CARDS */}
        <div className="studentdash-papers-container">
          {loading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <div>
              <p>Error: {error}</p>
              <button onClick={loadProjects}>Retry</button>
            </div>
          ) : projects.length === 0 ? (
            <p>No projects found. Try adjusting your filters.</p>
          ) : (
            projects.map(project => {
              const isSaved = savedProjects.has(project.id);
              const isSaving = savingProjects.has(project.id);
              return (
                <div key={project.id} className="studentdash-paper-card">
                  <div className={`studentdash-paper-banner ${project.field.toLowerCase()}`}>{project.field}</div>
                  <div className="studentdash-paper-title">
                    <img src={bookIcon} alt="Book" className="studentdash-paper-icon" />
                    {project.title}
                  </div>
                  <div className="studentdash-paper-meta-row">
                    <img src={authorIcon} alt="Author" className="studentdash-paper-meta-icon" />
                    <span className="studentdash-paper-meta-text">{project.author}</span>
                  </div>
                  <div className="studentdash-paper-meta-row">
                    <img src={yearIcon} alt="Year" className="studentdash-paper-meta-icon" />
                    <span className="studentdash-paper-meta-text">{project.year}</span>
                  </div>
                  <div className="studentdash-paper-actions">
                    <div
                      className={`studentdash-paper-save-btn ${isSaved ? "saved" : ""}`}
                      onClick={() => !isSaving && handleSaveProject(project.id, project.title)}
                      style={{ opacity: isSaving ? 0.6 : 1, cursor: isSaving ? "not-allowed" : "pointer" }}
                    >
                      {isSaving ? "Processing..." : isSaved ? "Unsave" : "Save"}
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
