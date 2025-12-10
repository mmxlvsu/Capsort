import React, { useState } from "react";
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

  const graphData = [
    { year: "2020", iot: 40, database: 30 },
    { year: "2021", iot: 70, database: 55 },
    { year: "2022", iot: 90, database: 60 },
    { year: "2023", iot: 85, database: 75 },
    { year: "2024", iot: 95, database: 80 },
  ];

  const pieData = [
    { name: "IoT", value: 75, fill: "green" },
    { name: "Database", value: 25, fill: "#FFBF00" },
  ];

  const topSavedProjects = [
    { title: "IoT Smart Bin", saves: 120, track: "IoT" },
    { title: "Database Analyzer", saves: 60, track: "Database" },
    { title: "IoT Smart Bin", saves: 24, track: "IoT" },
    { title: "Database Analyzer", saves: 20, track: "Database" },
    { title: "IoT Smart Bin", saves: 10, track: "IoT" },
  ];

  const maxSaves = Math.max(...topSavedProjects.map(p => p.saves));

  const totalProjects = 25;
  const activeStudents = 25;
  const totalSaves = 25;

  const MostViewed = "IOT Smart Bin";
  const MostViewedCount = 320;
  const MostViewedField = "IoT";
  const MostViewedAuthor = "Juan Dela Cruz";
  const MostViewedYear = 2024;

  return (
    <div>
      {/* Navbar */}
      <div className="aa-navbar">
        <div className="aa-navbar-left">
          <img src={citc} alt="CITC Logo" className="aa-navbar-logo" />
          <div className="aa-navbar-text">
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
          <span className="aa-projects-count">{totalProjects} uploaded capstones</span>
        </div>

        <div className="aa-active-box">
          <img src={peopleIcon} alt="People" className="aa-active-icon" />
          <span className="aa-active-label">Active Students</span>
          <span className="aa-active-count">{activeStudents} users active this month</span>
        </div>

        <div className="aa-saves-box">
          <img src={starIcon} alt="Star" className="aa-saves-icon" />
          <span className="aa-saves-label">Total Saves/Favorites</span>
          <span className="aa-saves-count">{totalSaves} total saved items</span>
        </div>

        <div className="aa-most-viewed-box">
          <img src={viewIcon} alt="Views" className="aa-view-icon" />
          <span className="aa-view-label">Most Viewed Project</span>
          <div className="aa-view-project-title">
            "{MostViewed}" – {MostViewedCount} views
          </div>
          <div
            className={`aa-view-field ${
              MostViewedField === "IoT" ? "aa-iot-field" : "aa-database-field"
            }`}
          >
            {MostViewedField}
          </div>
          <div className="aa-view-meta">
            <div className="aa-view-meta-item">
              <img src={userIcon} className="aa-view-meta-icon" />
              <span>{MostViewedAuthor}</span>
            </div>
            <div className="aa-view-meta-item">
              <img src={yearIcon} className="aa-view-meta-icon" />
              <span>{MostViewedYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="aa-graph-section">
        <div className="aa-graph-container">
          <h2 className="aa-graph-title">Total Projects</h2>
          <h2 className="aa-graph-subtitle">over the years (2013-present)</h2>
          <div className="aa-graph-wrapper">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={graphData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcdcdc" />
                <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 14 }} />
                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tick={{ fill: "#555", fontSize: 14 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="iot" fill="green" radius={[5, 5, 0, 0]} />
                <Bar dataKey="database" fill="#FFBF00" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="aa-graph-right">
          <h3 className="aa-track-title">Track Distribution</h3>
          <p className="aa-track-subtitle">Saves by Track</p>
          <div className="aa-pie-wrapper">
            <PieChart width={250} height={250}>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <PieTooltip />
            </PieChart>
          </div>
          <div className="aa-track-legends">
            <div className="aa-legend-item">
              <span className="aa-legend-color iot"></span> IoT
            </div>
            <div className="aa-legend-item">
              <span className="aa-legend-color database"></span> Database
            </div>
          </div>
        </div>
      </div>

      {/* Top Saved Projects */}
      <div className="aa-top-saved-container">
        <h3>Top 5 Most Saved Projects</h3>
        <div className="aa-top-saved-list">
          {topSavedProjects.map((proj, index) => {
            const widthPercent = (proj.saves / maxSaves) * 70;
            return (
              <div key={index} className="aa-top-saved-item">
                <span className="aa-top-saved-title">{proj.title}</span>
                <div
                  className="aa-top-saved-bar"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: proj.track === "IoT" ? "green" : "#FFBF00",
                  }}
                ></div>
                <span className="aa-top-saved-count">{proj.saves} saves</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
