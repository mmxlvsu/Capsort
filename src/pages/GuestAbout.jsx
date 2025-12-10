import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import userImg from "../assets/user.png";
import signoutIcon from "../assets/signout.png";
import capsort from "../assets/capsort.png";
import "../styles/GuestAbout.css"; // you can rename this to GuestAbout.css later

// ===== TEAM MEMBERS =====
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

// ===== CONTENT =====
const content = {
  title: 'About',
  mission:
    'CapSort is designed to provide an efficient and user-friendly platform for archiving, organizing, and discovering capstone projects from the University of Science and Technology of Southern Philippines. Our goal is to preserve the innovative work of students and make it accessible to future generations of learners and researchers.',
  contactEmail: 'capsort@ustp.edu.ph'
};

export default function GuestAbout() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="guestabout-wrapper">
      {/* NAVBAR */}
      <div className="guest-navbar">
        <div className="guest-navbar-left">
          <img src={citc} alt="CITC Logo" className="guest-navbar-logo" />
          <div className="guest-navbar-text">
            <span className="guest-navbar-title">Capsort</span>
            <span className="guest-navbar-subtitle">
              Capsort Archiving and Sorting System
            </span>
          </div>
        </div>

        <div className="guest-navbar-right">
          <div
            className="guest-navbar-link"
            onClick={() => navigate("/guest")}
          >
            Projects
          </div>
          <div
            className="guest-navbar-link guest-active"
            onClick={() => navigate("/guestabout")}
          >
            About Us
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="studentabout-content">
        {/* Header */}
        <div className="studentabout-header">
          <h1>{content.title}</h1>
          <img src={capsort} alt="CapSort Logo" className="studentabout-logo" />
        </div>

        {/* Mission */}
        <div className="studentabout-mission">
          <h2>Our Mission</h2>
          <p>{content.mission}</p>
        </div>

        {/* Features */}
        <div className="studentabout-features">
          {[
            { title: "Easy Search", desc: "Quickly find relevant capstone papers using our advanced filtering system." },
            { title: "Organized", desc: "Projects are categorized by field, year, and author for easy navigation." },
            { title: "Accessible", desc: "Open to students, faculty, and guests to explore innovative projects." },
          ].map((feature, index) => (
            <div key={index} className="studentabout-feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="studentabout-team">
          <h2>Our Team</h2>
          <div className="studentabout-team-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="studentabout-team-member">
                <div className="studentabout-avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <p className="studentabout-role">{member.role}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="studentabout-contact">
          <h2>Get in Touch</h2>
          <p>Have questions or suggestions? We'd love to hear from you.</p>
          <p className="studentabout-email">
            <a href={`mailto:${content.contactEmail}`} className="studentabout-contact-email-link">
              {content.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
