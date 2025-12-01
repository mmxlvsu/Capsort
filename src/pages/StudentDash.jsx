import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { projectsService } from "../services/projects";
import { savedProjectsService } from "../services/savedProjects";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png"; 
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";

import "../styles/StudentDash.css";

export default function StudentDash() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  // Filter states
  const [field, setField] = useState("All Fields");
  const [fromYear, setFromYear] = useState("From Year");
  const [toYear, setToYear] = useState("To Year");
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldOpen, setFieldOpen] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Data states
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedProjectIds, setSavedProjectIds] = useState(new Set());

  // Popup states
  const [popupData, setPopupData] = useState(null);
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [savingProject, setSavingProject] = useState(false);

  // Available fields (you can make this dynamic from backend later)
  const availableFields = ["All Fields", "IoT", "Database", "Web Development", "Mobile Development", "AI/ML"];

  // Fetch projects on mount and when filters change
  useEffect(() => {
    fetchProjects();
    fetchSavedProjects();
  }, [field, fromYear, toYear, searchQuery]);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");

    const filters = {
      search: searchQuery || undefined,
      field: field !== "All Fields" ? field : undefined,
      yearFrom: fromYear !== "From Year" ? fromYear : undefined,
      yearTo: toYear !== "To Year" ? toYear : undefined,
      limit: 100
    };

    const result = await projectsService.getProjects(filters);

    if (result.success) {
      setProjects(result.projects);
    } else {
      setError(result.error || "Failed to load projects");
      setProjects([]);
    }

    setLoading(false);
  };

  const fetchSavedProjects = async () => {
    const result = await savedProjectsService.getSavedProjects();
    
    if (result.success) {
      const savedIds = new Set(result.savedProjects.map(sp => sp.projectId));
      setSavedProjectIds(savedIds);
    }
  };

  const handleSaveProject = async (projectId) => {
    if (savedProjectIds.has(projectId)) {
      setShowSavedPopup(true);
      setTimeout(() => setShowSavedPopup(false), 2000);
      return;
    }

    setSavingProject(true);

    const result = await savedProjectsService.saveProject(projectId);

    if (result.success) {
      setSavedProjectIds(prev => new Set([...prev, projectId]));
      setShowSavedPopup(true);
      setTimeout(() => {
        setShowSavedPopup(false);
        setPopupData(null);
      }, 2000);
    } else {
      alert(result.error || "Failed to save project");
    }

    setSavingProject(false);
  };

  const handleResetFilters = () => {
    setField("All Fields");
    setFromYear("From Year");
    setToYear("To Year");
    setSearchQuery("");
  };

  const handleLogout = () => {
    logout();
    navigate("/signstudent");
  };

  const getFieldColor = (fieldName) => {
    const colors = {
      "IoT": "#008000",
      "Database": "#f1c40f",
      "Web Development": "#3498db",
      "Mobile Development": "#9b59b6",
      "AI/ML": "#e74c3c"
    };
    return colors[fieldName] || "#95a5a6";
  };

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
                <div className="nav-user-dropdown-item" onClick={handleLogout}>
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
        <div className="title-sub">
          {loading ? "Loading..." : `${projects.length} ${projects.length === 1 ? 'paper' : 'papers'} found`}
        </div>
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
                <input 
                  type="text" 
                  placeholder="Title, Author, or keyword" 
                  className="sidebar-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                  {availableFields.map((option) => (
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

            <button className="sidebar-reset-button" onClick={handleResetFilters}>
              Reset Filter
            </button>
          </div>
        </div>

        {/* Papers */}
        <div className="papers-wrapper">
          <div className="papers-container hide-scrollbar">
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
                Loading projects...
              </div>
            ) : error ? (
              <div style={{ padding: '20px', textAlign: 'center', width: '100%', color: 'red' }}>
                {error}
              </div>
            ) : projects.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
                No projects found. Try adjusting your filters.
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="paper-card">
                  <div className="paper-banner" style={{ backgroundColor: getFieldColor(project.field) }}>
                    {project.field}
                  </div>
                  <div className="paper-title">
                    <img src={require("../assets/book.png")} alt="Book" className="paper-title-icon" />
                    {project.title}
                  </div>
                  <div className="paper-author">
                    <img src={require("../assets/author.png")} alt="Author" className="paper-author-icon" />
                    {project.author}
                  </div>
                  <div className="paper-year">
                    <img src={require("../assets/year.png")} alt="Year" className="paper-year-icon" />
                    {project.year}
                  </div>
                  <div className="paper-view-btn-container">
                    <button 
                      className="paper-view-btn" 
                      onClick={() => setPopupData(project)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {popupData && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="popup-close-btn" onClick={() => setPopupData(null)}>×</button>

            <h2 className="popup-title">{popupData.title}</h2>
            <p className="popup-info">Field: {popupData.field}</p>
            <p className="popup-info">Author: {popupData.author}</p>
            <p className="popup-info">Year: {popupData.year}</p>
            {popupData.fileUrl && popupData.fileUrl !== 'https://placeholder.com/default.pdf' && (
              <p className="popup-info">
                <a href={popupData.fileUrl} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </p>
            )}

            <div className="popup-save-wrapper">
              <span className="popup-save-text">
                {savedProjectIds.has(popupData.id) ? "Already Saved" : "Add to Saved"}
              </span>
              <img
                src={savedProjectIds.has(popupData.id) ? require("../assets/saved.png") : require("../assets/save.png")}
                alt="Save"
                className="popup-save-icon"
                onClick={() => !savingProject && handleSaveProject(popupData.id)}
                style={{ 
                  cursor: savingProject ? 'not-allowed' : 'pointer',
                  opacity: savingProject ? 0.6 : 1
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
