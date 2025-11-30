import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import capsort from "../assets/capsort.png";
import userImg from "../assets/user.png";
import dropdownIcon from "../assets/dropdown.png";

import "../styles/StudentAbout.css";

const teamMembers = [
  {
    name: 'Dr. Maria Santos',
    role: 'Faculty Advisor',
    bio: 'Professor of Computer Science with 15 years of experience in software engineering and database systems.',
    initials: 'MS'
  },
  {
    name: 'Prof. Juan Dela Cruz',
    role: 'Technical Advisor',
    bio: 'Expert in web development and system architecture with a focus on educational technology.',
    initials: 'JD'
  },
  {
    name: 'Student Developer Team',
    role: 'Development Team',
    bio: 'A dedicated team of senior computer science students passionate about creating innovative solutions.',
    initials: 'DT'
  }
];

export default function NavigationBar({ studentName }) {
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const content = {
    title: 'About',
    mission:
      'CapSort is designed to provide an efficient and user-friendly platform for archiving, organizing, and discovering capstone projects from the University of Science and Technology of Southern Philippines. Our goal is to preserve the innovative work of students and make it accessible to future generations of learners and researchers.',
    contactEmail: 'capsort@ustp.edu.ph'
  };

  return (
    <>
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
          <div className="nav-link" onClick={() => navigate("/saved")}>Saved Projects</div>
          <div className="nav-link nav-link-active" onClick={() => navigate("/studentabout")}>About Us</div>

          <div className="nav-user-wrapper">
            <div className="nav-user-icon" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <img src={userImg} alt="User" className="nav-user-img" />
            </div>
            {showUserDropdown && (
              <div className="nav-user-dropdown">
                <div className="nav-user-dropdown-item" onClick={() => navigate("/login")}>
                  <img src={require("../assets/signout.png")} alt="Sign Out" className="nav-user-dropdown-icon" />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="aboutus-wrapper">
        {/* Header */}
        <div className="aboutus-header">
          <h1 className="aboutus-title">{content.title}</h1>
          <img src={capsort} alt="CapSort Logo" className="aboutus-logo" />
        </div>

        {/* Mission Section */}
        <div className="aboutus-mission">
          <h2 className="aboutus-mission-title">Our Mission</h2>
          <p className="aboutus-mission-desc">{content.mission}</p>
        </div>

        {/* Features Section */}
        <div className="aboutus-features">
          {[
            { title: "Easy Search", desc: "Quickly find relevant capstone papers using our advanced filtering system." },
            { title: "Organized", desc: "Projects are categorized by field, year, and author for easy navigation." },
            { title: "Accessible", desc: "Open to students, faculty, and guests to explore innovative projects." },
          ].map((feature, index) => (
            <div key={index} className="aboutus-feature-card">
              <h3 className="aboutus-feature-title">{feature.title}</h3>
              <p className="aboutus-feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="aboutus-team-section">
          <h2 className="aboutus-team-title">Our Team</h2>
          <div className="aboutus-team-cards">
            {teamMembers.map((member, index) => (
              <div key={index} className="aboutus-team-card">
                <div className="aboutus-team-avatar">{member.initials}</div>
                <h3 className="aboutus-team-name">{member.name}</h3>
                <p className="aboutus-team-role">{member.role}</p>
                <p className="aboutus-team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="guest-contact">
  <h2>Get in Touch</h2>
  <p>Have questions or suggestions? We'd love to hear from you.</p>
  <p className="email">
    <a href={`mailto:${content.contactEmail}`} style={{ color: "white", textDecoration: "underline" }}>
      {content.contactEmail}
    </a>
  </p>
</div>
      </div>
    </>
  );
}
