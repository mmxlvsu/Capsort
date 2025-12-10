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
  const { logout } = useAuth();
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
  const [savedProjects, setSavedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Popup / remove states
  const [showRemovedPopup, setShowRemovedPopup] = useState(false);
  const [removingProjectId, setRemovingProjectId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [projectToRemove, setProjectToRemove] = useState(null);

  // User dropdown
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Available fields
  const availableFields = ["All Fields", "IoT", "Database", "Web Development", "Mobile Development", "AI/ML"];

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
    <div className="page-container">
      {/* Navbar */}
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
          <div className="nav-link nav-link-active" onClick={() => navigate("/saved")}>Saved Projects</div>
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

      {/* Page Title */}
      <div className="page-header">
        <div className="page-title">Saved Capstone Projects</div>
        <div className="page-subtitle">
          {loading ? "Loading..." : `${savedProjects.length} ${savedProjects.length === 1 ? 'paper' : 'papers'} saved`}
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <img src={filterIcon} className="sidebar-icon" alt="Filter" />
            <h2 className="sidebar-title">Filters</h2>
          </div>

          {/* Search */}
          <label className="label">Search</label>
          <div className="input-container">
            <img src={searchIcon} className="input-icon" alt="Search" />
            <input
              className="input"
              placeholder="Title, Author, or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Field Dropdown */}
          <label className="label">Fields</label>
          <div className="dropdown" onClick={() => setFieldOpen(!fieldOpen)}>
            {field}
            <img src={dropdownIcon} className="dropdown-icon" />
          </div>
          {fieldOpen && (
            <div className="dropdown-list">
              {availableFields.map(option => (
                <div key={option} className="dropdown-item" onClick={() => { setField(option); setFieldOpen(false); }}>
                  {option}
                </div>
              ))}
            </div>
          )}

          {/* Year Filters */}
          <label className="label">Year</label>
          <div className="year-row">
            <div className="dropdown" onClick={() => setFromOpen(!fromOpen)}>
              {fromYear}
              <img src={dropdownIcon} className="dropdown-icon" />
            </div>
            {fromOpen && (
              <div className="dropdown-list tall">
                {years.map(year => (
                  <div key={year} className="dropdown-item" onClick={() => { setFromYear(year.toString()); setFromOpen(false); }}>
                    {year}
                  </div>
                ))}
              </div>
            )}

            <div className="dropdown" onClick={() => setToOpen(!toOpen)}>
              {toYear}
              <img src={dropdownIcon} className="dropdown-icon" />
            </div>
            {toOpen && (
              <div className="dropdown-list tall">
                {years.map(year => (
                  <div key={year} className="dropdown-item" onClick={() => { setToYear(year.toString()); setToOpen(false); }}>
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="reset-btn" onClick={handleResetFilters}>Reset Filter</button>
        </div>

        {/* Saved Projects Cards */}
        <div className="cards-container">
          {loading ? (
            <div style={{ padding: '20px' }}>Loading saved projects...</div>
          ) : error ? (
            <div style={{ padding: '20px', color: 'red' }}>{error}</div>
          ) : savedProjects.length === 0 ? (
            <div style={{ padding: '20px' }}>
              No saved projects yet. Go to <span style={{ color: '#008000', cursor: 'pointer' }} onClick={() => navigate("/studentdash")}>Projects</span> to save some!
            </div>
          ) : (
            savedProjects.map(savedProject => {
              const project = savedProject.project;
              return (
                <div key={savedProject.id} className="card">
                  <div className="card-banner" style={{ backgroundColor: getFieldColor(project.field) }}>
                    {project.field}
                  </div>
                  <div className="card-title">
                    <img src={require("../assets/book.png")} className="card-icon" alt="Book" />
                    {project.title}
                  </div>
                  <div className="card-meta">
                    <img src={require("../assets/author.png")} className="meta-icon" alt="Author" />
                    {project.author}
                  </div>
                  <div className="card-meta">
                    <img src={require("../assets/year.png")} className="meta-icon" alt="Year" />
                    {project.year}
                  </div>
                  <div className="card-meta">
                    <button 
                      className="paper-view-btn" 
                      onClick={() => confirmRemove(project)}
                      style={{ cursor: removingProjectId === project.id ? 'not-allowed' : 'pointer', opacity: removingProjectId === project.id ? 0.6 : 1 }}
                    >
                      {removingProjectId === project.id ? 'Removing...' : 'Remove from Saved'}
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
}
