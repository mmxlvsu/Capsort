import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { analyticsService } from "../services/analyticsService";

import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import signOutIcon from "../assets/signout.png";
import waveIcon from "../assets/wave.png";
import folderIcon from "../assets/folder.png";
import peopleIcon from "../assets/people.png";
import starIcon from "../assets/star.png";
import viewIcon from "../assets/view.png";
import userIcon from "../assets/user.png";
import yearIcon from "../assets/year.png";

import "../styles/AdminAnalytics.css";

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Data states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalProjects: 0,
    totalUsers: 0,
    totalSaves: 0,
    activeStudents: 0,
    mostViewedProject: null
  });
  const [projectsByYear, setProjectsByYear] = useState([]);
  const [fieldDistribution, setFieldDistribution] = useState([]);
  const [topSavedProjects, setTopSavedProjects] = useState([]);

  // Field colors mapping (only Database and IoT)
  const fieldColors = {
    'IoT': '#4CAF50',
    'Database': '#FFBF00'
  };

  // Load all analytics data
  const loadAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all analytics data in parallel
      const [
        dashboardResult,
        projectsByYearResult,
        fieldDistributionResult,
        topSavedResult
      ] = await Promise.all([
        analyticsService.getDashboardSummary(),
        analyticsService.getProjectsByYear(),
        analyticsService.getFieldDistribution(),
        analyticsService.getTopSavedProjects(5)
      ]);

      // Handle dashboard data
      if (dashboardResult.error) {
        throw new Error(dashboardResult.message || 'Failed to load dashboard data');
      }
      setDashboardData(dashboardResult.data.summary);

      // Handle projects by year data
      if (projectsByYearResult.error) {
        throw new Error(projectsByYearResult.message || 'Failed to load projects by year');
      }
      setProjectsByYear(projectsByYearResult.data.data || []);

      // Handle field distribution data
      if (fieldDistributionResult.error) {
        throw new Error(fieldDistributionResult.message || 'Failed to load field distribution');
      }
      const distributionData = fieldDistributionResult.data.data || [];
      const formattedDistribution = distributionData.map(item => ({
        name: item.name,
        value: item.value,
        fill: fieldColors[item.name] || '#666666'
      }));
      setFieldDistribution(formattedDistribution);

      // Handle top saved projects data
      if (topSavedResult.error) {
        throw new Error(topSavedResult.message || 'Failed to load top saved projects');
      }
      setTopSavedProjects(topSavedResult.data.data || []);

    } catch (err) {
      setError(err.message || 'Failed to load analytics data');
      console.error('Analytics loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount
  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  // Calculate max saves for progress bars
  const maxSaves = topSavedProjects.length > 0 
    ? Math.max(...topSavedProjects.map(p => p.saves))
    : 1;

  if (loading) {
    return (
      <div>
        {/* Navbar */}
        <div className="aa-navbar">
          <div className="aa-navbar-left">
            <img 
              src={citc} 
              alt="CITC Logo" 
              className="aa-navbar-logo" 
              onClick={() => navigate("/splash")}
              style={{ cursor: 'pointer' }}
            />
            <div className="aa-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }}>
              <span className="aa-navbar-title">Capsort</span>
              <span className="aa-navbar-subtitle">
                Capsort Archiving and Sorting System
              </span>
            </div>
          </div>
          <div className="aa-navbar-right">
            <div className="aa-navbar-link" onClick={() => navigate("/admindash")}>
              Projects
            </div>
            <div className="aa-navbar-link aa-active">
              Analytics
            </div>
            <div className="aa-user-icon-container">
              <div className="aa-user-icon">
                <img src={userImg} alt="User" className="aa-user-img" />
              </div>
            </div>
          </div>
        </div>
        <div className="aa-loading">
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {/* Navbar */}
        <div className="aa-navbar">
          <div className="aa-navbar-left">
            <img 
              src={citc} 
              alt="CITC Logo" 
              className="aa-navbar-logo" 
              onClick={() => navigate("/splash")}
              style={{ cursor: 'pointer' }}
            />
            <div className="aa-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }}>
              <span className="aa-navbar-title">Capsort</span>
              <span className="aa-navbar-subtitle">
                Capsort Archiving and Sorting System
              </span>
            </div>
          </div>
          <div className="aa-navbar-right">
            <div className="aa-navbar-link" onClick={() => navigate("/admindash")}>
              Projects
            </div>
            <div className="aa-navbar-link aa-active">
              Analytics
            </div>
            <div className="aa-user-icon-container">
              <div className="aa-user-icon">
                <img src={userImg} alt="User" className="aa-user-img" />
              </div>
            </div>
          </div>
        </div>
        <div className="aa-error">
          <p>Error: {error}</p>
          <button onClick={loadAnalyticsData} className="aa-retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <div className="aa-navbar">
        <div className="aa-navbar-left">
          <img 
            src={citc} 
            alt="CITC Logo" 
            className="aa-navbar-logo" 
            onClick={() => navigate("/splash")}
            style={{ cursor: 'pointer' }}
          />
          <div className="aa-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }}>
            <span className="aa-navbar-title">Capsort</span>
            <span className="aa-navbar-subtitle">
              Capsort Archiving and Sorting System
            </span>
          </div>
        </div>

        <div className="aa-navbar-right">
          <div className="aa-navbar-link" onClick={() => navigate("/admindash")}>
            Projects
          </div>
          <div
            className="aa-navbar-link aa-active"
            onClick={() => navigate("/adminanalytics")}
          >
            Analytics
          </div>
          <div className="aa-user-icon-container">
            <div
              className="aa-user-icon"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <img src={userImg} alt="User" className="aa-user-img" />
            </div>
            {showUserDropdown && (
              <div className="aa-user-dropdown">
                <div
                  className="aa-user-dropdown-item"
                  onClick={() => navigate("/splash")}
                >
                  <img src={signOutIcon} alt="Sign Out" className="aa-user-dropdown-icon" />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div className="aa-greeting-section">
        <div className="aa-greeting-title">
          Hi, Admin! <img src={waveIcon} alt="Wave" className="aa-greeting-wave" />
        </div>
        <div className="aa-greeting-subtitle">
          This is the overview of student activity and project performance.
        </div>
      </div>

      {/* Summary Boxes */}
      <div className="aa-summary-container">
        <div className="aa-projects-box">
          <img src={folderIcon} alt="Folder" className="aa-projects-icon" />
          <span className="aa-projects-label">Total Projects</span>
          <span className="aa-projects-count">{dashboardData.totalProjects} uploaded capstones</span>
        </div>

        <div className="aa-active-box">
          <img src={peopleIcon} alt="People" className="aa-active-icon" />
          <span className="aa-active-label">Active Students</span>
          <span className="aa-active-count">{dashboardData.activeStudents} users active this month</span>
        </div>

        <div className="aa-saves-box">
          <img src={starIcon} alt="Star" className="aa-saves-icon" />
          <span className="aa-saves-label">Total Saves/Favorites</span>
          <span className="aa-saves-count">{dashboardData.totalSaves} total saved items</span>
        </div>

        <div className="aa-most-viewed-box">
          <img src={viewIcon} alt="Views" className="aa-view-icon" />
          <span className="aa-view-label">Most Saved Project</span>
          {dashboardData.mostViewedProject ? (
            <>
              <div className="aa-view-project-title">
                "{dashboardData.mostViewedProject.title}" – {dashboardData.mostViewedProject.views} saves
              </div>
              <div
                className={`aa-view-field ${
                  dashboardData.mostViewedProject.field === "IoT" ? "aa-iot-field" : "aa-database-field"
                }`}
              >
                {dashboardData.mostViewedProject.field}
              </div>
              <div className="aa-view-meta">
                <div className="aa-view-meta-item">
                  <img src={userIcon} className="aa-view-meta-icon" />
                  <span>{dashboardData.mostViewedProject.author}</span>
                </div>
                <div className="aa-view-meta-item">
                  <img src={yearIcon} className="aa-view-meta-icon" />
                  <span>{dashboardData.mostViewedProject.year}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="aa-view-project-title">No projects saved yet</div>
          )}
        </div>
      </div>

      {/* Graph Section */}
      <div className="aa-graph-section">
        <div className="aa-graph-container">
          <h2 className="aa-graph-title">Total Projects</h2>
          <h2 className="aa-graph-subtitle">over the years</h2>
          <div className="aa-graph-wrapper">
            {projectsByYear.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={projectsByYear} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dcdcdc" />
                  <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 14 }} />
                  <YAxis tick={{ fill: "#555", fontSize: 14 }} />
                  <Tooltip />
                  <Legend />
                  {/* Dynamically render bars for each field */}
                  {Object.keys(fieldColors).map(field => (
                    <Bar 
                      key={field} 
                      dataKey={field} 
                      fill={fieldColors[field]} 
                      radius={[5, 5, 0, 0]} 
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="aa-no-data">
                <p>No project data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="aa-graph-right">
          <h3 className="aa-track-title">Field Distribution</h3>
          <p className="aa-track-subtitle">Projects by Field</p>
          <div className="aa-pie-wrapper">
            {fieldDistribution.length > 0 ? (
              <PieChart width={250} height={250}>
                <Pie 
                  data={fieldDistribution} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={90} 
                  dataKey="value" 
                  paddingAngle={3}
                >
                  {fieldDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <PieTooltip />
              </PieChart>
            ) : (
              <div className="aa-no-data">
                <p>No field data available</p>
              </div>
            )}
          </div>
          <div className="aa-track-legends">
            {fieldDistribution.map((field, index) => (
              <div key={index} className="aa-legend-item">
                <span 
                  className="aa-legend-color" 
                  style={{ backgroundColor: field.fill }}
                ></span> 
                {field.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Saved Projects */}
      <div className="aa-top-saved-container">
        <h3>Top 5 Most Saved Projects</h3>
        <div className="aa-top-saved-list">
          {topSavedProjects.length > 0 ? (
            topSavedProjects.map((proj, index) => {
              const widthPercent = (proj.saves / maxSaves) * 70;
              return (
                <div key={index} className="aa-top-saved-item">
                  <span className="aa-top-saved-title">{proj.title}</span>
                  <div
                    className="aa-top-saved-bar"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: fieldColors[proj.field] || "#666666",
                    }}
                  ></div>
                  <span className="aa-top-saved-count">{proj.saves} saves</span>
                </div>
              );
            })
          ) : (
            <div className="aa-no-data">
              <p>No saved projects data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
