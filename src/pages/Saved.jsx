import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { savedProjectsService } from "../services/savedProjects";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png"; 
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";

import "../styles/StudentDash.css";

export default function Saved() {
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
  const [savedProjects, setSavedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Popup states
  const [showRemovedPopup, setShowRemovedPopup] = useState(false);
  const [removingProjectId, setRemovingProjectId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [projectToRemove, setProjectToRemove] = useState(null);

  // Available fields
  const availableFields = ["All Fields", "IoT", "Database", "Web Development", "Mobile Development", "AI/ML"];

  // Fetch saved projects on mount and when filters change
  useEffect(() => {
    fetchSavedProjects();
  }, [field, fromYear, toYear, searchQuery]);

  const fetchSavedProjects = async () => {
    setLoading(true);
    setError("");

    const filters = {
      search: searchQuery || undefined,
      field: field !== "All Fields" ? field : undefined,
      yearFrom: fromYear !== "From Year" ? fromYear : undefined,
      yearTo: toYear !== "To Year" ? toYear : undefined
    };

    const result = await savedProjectsService.getSavedProjects(filters);

    if (result.success) {
      setSavedProjects(result.savedProjects);
    } else {
      setError(result.error || "Failed to load saved projects");
      setSavedProjects([]);
    }

    setLoading(false);
  };

  const handleRemoveProject = async (projectId) => {
    setRemovingProjectId(projectId);

    const result = await savedProjectsService.unsaveProject(projectId);

    if (result.success) {
      // Remove from local state immediately
      setSavedProjects(prev => prev.filter(sp => sp.projectId !== projectId));
      setShowRemovedPopup(true);
      setTimeout(() => setShowRemovedPopup(false), 2000);
    } else {
      alert(result.error || "Failed to remove project");
    }

    setRemovingProjectId(null);
    setShowConfirmDialog(false);
    setProjectToRemove(null);
  };

  const confirmRemove = (project) => {
    setProjectToRemove(project);
    setShowConfirmDialog(true);
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
          <div className="nav-link" onClick={() => navigate("/studentdash")}>Projects</div>
          <div className="nav-link  nav-link-active" onClick={() => navigate("/saved")}>Saved Projects</div>
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
        <div className="title-main">Saved Capstone Projects</div>
        <div className="title-sub">
          {loading ? "Loading..." : `${savedProjects.length} ${savedProjects.length === 1 ? 'paper' : 'papers'} saved`}
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
                Loading saved projects...
              </div>
            ) : error ? (
              <div style={{ padding: '20px', textAlign: 'center', width: '100%', color: 'red' }}>
                {error}
              </div>
            ) : savedProjects.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
                No saved projects yet. Go to <span 
                  style={{ color: '#008000', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate('/studentdash')}
                >
                  Projects
                </span> to save some!
              </div>
            ) : (
              savedProjects.map((savedProject) => {
                const project = savedProject.project;
                return (
                  <div key={savedProject.id} className="paper-card">
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

                    <div 
                      className="paper-removed-btn-container" 
                      onClick={() => confirmRemove(project)}
                      style={{
                        cursor: removingProjectId === project.id ? 'not-allowed' : 'pointer',
                        opacity: removingProjectId === project.id ? 0.6 : 1
                      }}
                    >
                      <span className="paper-removed-text">
                        {removingProjectId === project.id ? 'Removing...' : 'Remove from Saved'}
                      </span>
                      <img 
                        src={require("../assets/saved.png")} 
                        alt="Saved Icon" 
                        className="paper-removed-icon" 
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && projectToRemove && (
        <div className="popup-overlay">
          <div className="popup-container" style={{ maxWidth: '400px' }}>
            <button className="popup-close-btn" onClick={() => {
              setShowConfirmDialog(false);
              setProjectToRemove(null);
            }}>×</button>

            <h2 className="popup-title">Remove Project?</h2>
            <p className="popup-info" style={{ marginBottom: '20px' }}>
              Are you sure you want to remove "{projectToRemove.title}" from your saved projects?
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={() => handleRemoveProject(projectToRemove.id)}
                disabled={removingProjectId === projectToRemove.id}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: removingProjectId === projectToRemove.id ? 'not-allowed' : 'pointer',
                  opacity: removingProjectId === projectToRemove.id ? 0.6 : 1
                }}
              >
                {removingProjectId === projectToRemove.id ? 'Removing...' : 'Yes, Remove'}
              </button>
              <button 
                onClick={() => {
                  setShowConfirmDialog(false);
                  setProjectToRemove(null);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showRemovedPopup && (
        <div className="saved-popup-overlay" onClick={() => setShowRemovedPopup(false)}>
          <div className="saved-popup-container">
            Successfully removed from your Saved Projects
          </div>
        </div>
      )}
    </div>
  );
}
