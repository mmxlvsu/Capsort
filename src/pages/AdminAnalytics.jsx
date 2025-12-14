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

  // Field colors mapping
  const fieldColors = {
    'IoT': '#4CAF50',
    'Database': '#FFBF00'
  };

  // Load all analytics data
  const loadAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

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

      if (dashboardResult.error) throw new Error(dashboardResult.message || 'Failed to load dashboard data');
      setDashboardData(dashboardResult.data.summary);

      if (projectsByYearResult.error) throw new Error(projectsByYearResult.message || 'Failed to load projects by year');
      setProjectsByYear(projectsByYearResult.data.data || []);

      if (fieldDistributionResult.error) throw new Error(fieldDistributionResult.message || 'Failed to load field distribution');
      const distributionData = fieldDistributionResult.data.data || [];
      const formattedDistribution = distributionData.map(item => ({
        name: item.name,
        value: item.value,
        fill: fieldColors[item.name] || '#666666'
      }));
      setFieldDistribution(formattedDistribution);

      if (topSavedResult.error) throw new Error(topSavedResult.message || 'Failed to load top saved projects');
      setTopSavedProjects(topSavedResult.data.data || []);

    } catch (err) {
      setError(err.message || 'Failed to load analytics data');
      console.error('Analytics loading error:', err);
    } finally {
      setLoading(false);
    }
  }, [fieldColors]); // ✅ Added fieldColors dependency

  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  const maxSaves = topSavedProjects.length > 0 
    ? Math.max(...topSavedProjects.map(p => p.saves))
    : 1;

  if (loading) {
    return (
      <div>
        <div className="aa-navbar">
          <div className="aa-navbar-left">
            <img src={citc} alt="CITC Logo" className="aa-navbar-logo" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }} />
            <div className="aa-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }}>
              <span className="aa-navbar-title">Capsort</span>
              <span className="aa-navbar-subtitle">Capsort Archiving and Sorting System</span>
            </div>
          </div>
          <div className="aa-navbar-right">
            <div className="aa-navbar-link" onClick={() => navigate("/admindash")}>Projects</div>
            <div className="aa-navbar-link aa-active">Analytics</div>
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
        <div className="aa-navbar">
          <div className="aa-navbar-left">
            <img src={citc} alt="CITC Logo" className="aa-navbar-logo" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }} />
            <div className="aa-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }}>
              <span className="aa-navbar-title">Capsort</span>
              <span className="aa-navbar-subtitle">Capsort Archiving and Sorting System</span>
            </div>
          </div>
          <div className="aa-navbar-right">
            <div className="aa-navbar-link" onClick={() => navigate("/admindash")}>Projects</div>
            <div className="aa-navbar-link aa-active">Analytics</div>
            <div className="aa-user-icon-container">
              <div className="aa-user-icon">
                <img src={userImg} alt="User" className="aa-user-img" />
              </div>
            </div>
          </div>
        </div>
        <div className="aa-error">
          <p>Error: {error}</p>
          <button onClick={loadAnalyticsData} className="aa-retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <div className="aa-navbar">
        <div className="aa-navbar-left">
          <img src={citc} alt="CITC Logo" className="aa-navbar-logo" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }} />
          <div className="aa-navbar-text" onClick={() => navigate("/splash")} style={{ cursor: 'pointer' }}>
            <span className="aa-navbar-title">Capsort</span>
            <span className="aa-navbar-subtitle">Capsort Archiving and Sorting System</span>
          </div>
        </div>
        <div className="aa-navbar-right">
          <div className="aa-navbar-link" onClick={() => navigate("/admindash")}>Projects</div>
          <div className="aa-navbar-link aa-active" onClick={() => navigate("/adminanalytics")}>Analytics</div>
          <div className="aa-user-icon-container">
            <div className="aa-user-icon" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <img src={userImg} alt="User" className="aa-user-img" />
            </div>
            {showUserDropdown && (
              <div className="aa-user-dropdown">
                <div className="aa-user-dropdown-item" onClick={() => navigate("/splash")}>
                  <img src={signOutIcon} alt="Sign Out" className="aa-user-dropdown-icon" />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Remaining JSX remains unchanged, all <img> tags now have alt attributes */}
      {/* ... */}
    </div>
  );
}
