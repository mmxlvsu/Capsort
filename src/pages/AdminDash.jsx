import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import filterIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";
import dropdownIcon from "../assets/dropdown.png";
import addIcon from "../assets/add.png";
import { projectService } from "../services/projectService";

import "../styles/AdminDash.css";

export default function AdminDash() {
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
  const [showTrashConfirm, setShowTrashConfirm] = useState(false);
  const [popupData, setPopupData] = useState(null);
  
  // Data states
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    field: ''
  });

  // Available fields (you can expand this list)
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

  // Handle form input changes
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle add new project
  const handleAddProject = async () => {
    try {
      if (!formData.title || !formData.author || !formData.year || !formData.field) {
        alert('Please fill in all fields');
        return;
      }

      const result = await projectService.createProject(formData);
      
      if (result.error) {
        alert(result.message || 'Failed to create project');
      } else {
        alert('Project added successfully!');
        setPopupData(null);
        setFormData({ title: '', author: '', year: '', field: '' });
        loadProjects(); // Reload projects
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  // Handle edit project
  const handleEditProject = async () => {
    try {
      if (!formData.title || !formData.author || !formData.year || !formData.field) {
        alert('Please fill in all fields');
        return;
      }

      const result = await projectService.updateProject(popupData.id, formData);
      
      if (result.error) {
        alert(result.message || 'Failed to update project');
      } else {
        alert('Project updated successfully!');
        setPopupData(null);
        setFormData({ title: '', author: '', year: '', field: '' });
        loadProjects(); // Reload projects
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  // Handle delete project (move to trash)
  const handleDeleteProject = async () => {
    try {
      const result = await projectService.deleteProject(popupData.id);
      
      if (result.error) {
        alert(result.message || 'Failed to delete project');
      } else {
        alert('Project moved to trash successfully!');
        setPopupData(null);
        setShowTrashConfirm(false);
        loadProjects(); // Reload projects
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  // Handle opening edit modal
  const handleOpenEditModal = (project) => {
    setFormData({
      title: project.title,
      author: project.author,
      year: project.year.toString(),
      field: project.field
    });
    setPopupData({ 
      isEdit: true, 
      id: project.id,
      title: project.title,
      author: project.author,
      year: project.year,
      field: project.field
    });
  };

  // Handle opening add modal
  const handleOpenAddModal = () => {
    setFormData({ title: '', author: '', year: '', field: '' });
    setPopupData({ isNew: true });
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
          onClick={handleOpenAddModal}
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
                value={searchQuery}
                onChange={handleSearchChange}
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
                {availableFields.map(option => (
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
            onClick={resetFilters}
          >
            Reset Filter
          </button>
        </div>

        {/* PAPERS */}
        <div className="admndash-papers-container">
          {loading ? (
            <div className="admndash-loading">
              <p>Loading projects...</p>
            </div>
          ) : error ? (
            <div className="admndash-error">
              <p>Error: {error}</p>
              <button onClick={loadProjects} className="admndash-retry-btn">
                Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="admndash-no-projects">
              <p>No projects found. Try adjusting your filters or add a new project.</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="admndash-paper-card">
                <div className={`admndash-paper-banner ${project.field.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
                  {project.field}
                </div>

                <div className="admndash-paper-title">
                  <img src={require("../assets/book.png")} alt="Book" className="admndash-paper-icon" />
                  {project.title}
                </div>

                <div className="admndash-paper-meta-row">
                  <img src={require("../assets/author.png")} alt="Author" className="admndash-paper-meta-icon" />
                  <span className="admndash-paper-meta-text">{project.author}</span>
                </div>

                <div className="admndash-paper-meta-row">
                  <img src={require("../assets/year.png")} alt="Year" className="admndash-paper-meta-icon" />
                  <span className="admndash-paper-meta-text">{project.year}</span>
                </div>

                <div className="admndash-paper-meta-row">
                  <img src={require("../assets/user.png")} alt="Uploader" className="admndash-paper-meta-icon" />
                  <span className="admndash-paper-meta-text">
                    {project.uploader ? project.uploader.fullName : 'Unknown'}
                  </span>
                </div>

                <div
                  className="admndash-paper-edit-btn"
                  onClick={() => handleOpenEditModal(project)}
                >
                  <img src={require("../assets/edit.png")} alt="Edit" className="admndash-paper-edit-icon" />
                  Edit Paper
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {popupData?.isEdit && (
        <div className="admndash-add-paper-modal-overlay">
          <div className="admndash-add-paper-modal">
            <button
              className="admndash-add-paper-modal-close"
              onClick={() => setPopupData(null)}
            >
              &times;
            </button>

            <h2 className="admndash-add-paper-modal-title">Edit Capstone Paper</h2>
            <p className="admndash-add-paper-modal-subtitle">
              Update the details of the capstone paper.
            </p>

            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter paper title" 
              className="admndash-add-paper-modal-input"
              value={formData.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
            />
            
            <label>Author</label>
            <input 
              type="text" 
              placeholder="Enter author name" 
              className="admndash-add-paper-modal-input"
              value={formData.author}
              onChange={(e) => handleFormChange('author', e.target.value)}
            />
            
            <label>Year</label>
            <input 
              type="number" 
              placeholder="2025" 
              className="admndash-add-paper-modal-input"
              value={formData.year}
              onChange={(e) => handleFormChange('year', e.target.value)}
              min="1900"
              max="2100"
            />
            
            <label>Field</label>
            <select 
              className="admndash-add-paper-modal-input"
              value={formData.field}
              onChange={(e) => handleFormChange('field', e.target.value)}
            >
              <option value="">Select Field</option>
              {availableFields.filter(field => field !== "All Fields").map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>

            <div className="admndash-add-paper-modal-buttons">
              <button 
                className="admndash-add-paper-modal-trash" 
                onClick={() => setShowTrashConfirm(true)}
              >
                Move to Trash
              </button>
              <button 
                className="admndash-add-paper-modal-submit"
                onClick={handleEditProject}
              >
                Save Changes
              </button>
            </div>

            {showTrashConfirm && (
              <div className="admndash-trash-confirm-overlay">
                <div className="admndash-trash-confirm-modal">
                  <p>Are you sure you want to move this paper to trash?</p>
                  <div className="admndash-trash-confirm-buttons">
                    <button 
                      className="admndash-trash-cancel" 
                      onClick={() => setShowTrashConfirm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="admndash-trash-confirm" 
                      onClick={handleDeleteProject}
                    >
                      Yes, Move to Trash
                    </button>
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
            <button
              className="admndash-add-paper-modal-close"
              onClick={() => setPopupData(null)}
            >
              &times;
            </button>

            <h2 className="admndash-add-paper-modal-title">Add Capstone Paper</h2>
            <p className="admndash-add-paper-modal-subtitle">
              Enter the details of the capstone paper to add it to the repository.
            </p>

            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter paper title" 
              className="admndash-add-paper-modal-input"
              value={formData.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
            />
            
            <label>Author</label>
            <input 
              type="text" 
              placeholder="Enter author name" 
              className="admndash-add-paper-modal-input"
              value={formData.author}
              onChange={(e) => handleFormChange('author', e.target.value)}
            />
            
            <label>Year</label>
            <input 
              type="number" 
              placeholder="2025" 
              className="admndash-add-paper-modal-input"
              value={formData.year}
              onChange={(e) => handleFormChange('year', e.target.value)}
              min="1900"
              max="2100"
            />
            
            <label>Field</label>
            <select 
              className="admndash-add-paper-modal-input"
              value={formData.field}
              onChange={(e) => handleFormChange('field', e.target.value)}
            >
              <option value="">Select Field</option>
              {availableFields.filter(field => field !== "All Fields").map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>

            <div className="admndash-add-paper-modal-buttons">
              <button 
                className="admndash-add-paper-modal-cancel" 
                onClick={() => setPopupData(null)}
              >
                Cancel
              </button>
              <button 
                className="admndash-add-paper-modal-submit"
                onClick={handleAddProject}
              >
                Add Paper
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
