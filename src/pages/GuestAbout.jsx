import React from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import capsort from "../assets/capsort.png";
import "../styles/GuestAbout.css";

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

export default function Guestabout() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar */}
      <div className="guest-nav">
        <div className="guest-nav-left">
          <img src={citc} alt="CITC Logo" className="guest-nav-left-logo" />
          <div className="guest-nav-left-text">
            <span>Capsort</span>
            <span>Capsort Archiving and Sorting System</span>
          </div>
        </div>
        <div className="guest-nav-right">
          <div onClick={() => navigate("/guest")}>Projects</div>
          <div className="active">About Us</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="guest-content">
        {/* Header */}
        <div className="guest-header">
          <h1>{content.title}</h1>
          <img src={capsort} alt="CapSort Logo" className="guest-logo" />
        </div>

        {/* Mission */}
        <div className="guest-mission">
          <h2>Our Mission</h2>
          <p>{content.mission}</p>
        </div>

        {/* Features */}
        <div className="guest-features">
          {[
            { title: "Easy Search", desc: "Quickly find relevant capstone papers using our advanced filtering system." },
            { title: "Organized", desc: "Projects are categorized by field, year, and author for easy navigation." },
            { title: "Accessible", desc: "Open to students, faculty, and guests to explore innovative projects." },
          ].map((feature, index) => (
            <div key={index} className="guest-feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="guest-team">
          <h2>Our Team</h2>
          <div className="guest-team-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="guest-team-member">
                <div className="avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p>{member.bio}</p>
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
