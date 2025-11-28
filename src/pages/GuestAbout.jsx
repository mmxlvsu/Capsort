import React from "react";
import { useNavigate } from "react-router-dom";
import citc from "../assets/citc.png";
import capsort from "../assets/capsort.png";

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

export default function NavigationBar() {
  const navigate = useNavigate();

  const content = {
    title: 'About',
    mission:
      'CapSort is designed to provide an efficient and user-friendly platform for archiving, organizing, and discovering capstone projects from the University of Science and Technology of Southern Philippines. Our goal is to preserve the innovative work of students and make it accessible to future generations of learners and researchers.',
    contactEmail: 'capsort@ustp.edu.ph'
  };

  return (
    <>
      {/* Navigation Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "35px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #D8D8D8",
          justifyContent: "space-between",
          padding: "0 30px",
          color: "black",
          fontFamily: "Poppins",
          fontSize: "10px",
          fontWeight: 400,
          zIndex: 1000,
        }}
      >
        {/* Left: Logo + Text */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src={citc} alt="CITC Logo" style={{ height: "20px" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: "10px", fontWeight: 700 }}>Capsort</span>
            <span style={{ fontSize: "8px", fontWeight: 400 }}>
              Capsort Archiving and Sorting System
            </span>
          </div>
        </div>

        {/* Right: Navigation */}
        <div style={{ display: "flex", gap: "30px" }}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/guest")} 
          >
            Projects
          </div>
          <div
            style={{
              borderBottom: "1px solid black",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            About Us
          </div>
        </div>
      </div>

      {/* About Us Content */}
      <div
        style={{
          marginTop: "35px",
          height: "calc(100vh - 35px)",
          overflowY: "auto",
          padding: "20px",
          backgroundColor: "#f8f8f8",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginTop: "-2px", marginBottom: "15px" }}>
          <h1 style={{ fontFamily: "Poppins", fontSize: "18px", color: "#1a1851", marginBottom: "10px" }}>
            {content.title}
          </h1>
          {/* CapSort Logo under the title */}
  <img 
  src={capsort} 
  alt="CapSort Logo" 
  style={{ 
    display: "block", 
    margin: "0 auto 10px", 
    width: "240px", 
    height: "auto" 
  }} 
/>
        </div>

        {/* Mission Section */}
        <div style={{
          backgroundColor: "#1a1851",
          borderRadius: "10px",
          padding: "30px",
          marginBottom: "20px",
        }}>
          <h2 style={{ textAlign: "center", fontFamily: "Poppins", fontSize: "18px", color: "white", marginBottom: "5px", fontWeight: "bold" }}>Our Mission</h2>
          <p style={{ fontFamily: "Poppins", fontSize: "15px", color: "white", lineHeight: 1.6 }}>
            {content.mission}
          </p>
        </div>

        {/* Features Section */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
          {[
            { title: "Easy Search", desc: "Quickly find relevant capstone papers using our advanced filtering system." },
            { title: "Organized", desc: "Projects are categorized by field, year, and author for easy navigation." },
            { title: "Accessible", desc: "Open to students, faculty, and guests to explore innovative projects." },
          ].map((feature, index) => (
            <div key={index} style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              flex: "1 1 300px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              <h3 style={{ fontFamily: "Poppins", fontSize: "18px", color: "#1a1851", marginBottom: "10px" }}>{feature.title}</h3>
              <p style={{ fontFamily: "Poppins", fontSize: "15px", color: "#1e1e1e" }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "Poppins", fontSize: "24px", color: "#1a1851", textAlign: "center", marginBottom: "30px" }}>
            Our Team
          </h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "250px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}>
                <div style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  backgroundColor: "#1a1851",
                  color: "white",
                  fontSize: "px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px auto"
                }}>
                  {member.initials}
                </div>
                <h3 style={{ fontFamily: "Poppins", fontSize: "18px", color: "#1a1851", marginBottom: "5px" }}>{member.name}</h3>
                <p style={{ fontFamily: "Poppins", fontSize: "12px", color: "#FFD338", marginBottom: "10px" }}>{member.role}</p>
                <p style={{ fontFamily: "Poppins", fontSize: "10px", color: "#1e1e1e" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div style={{
          backgroundColor: "#1a1851",
          color: "white",
          borderRadius: "15px",
          padding: "30px",
          textAlign: "center"
        }}>
          <h2 style={{ fontFamily: "Poppins", fontSize: "14px", marginBottom: "15px" }}>Get in Touch</h2>
          <p style={{ fontFamily: "Poppins", fontSize: "10px", marginBottom: "15px" }}>
            Have questions or suggestions? We'd love to hear from you.
          </p>
          <p style={{ fontFamily: "Poppins", fontSize: "14px" }}>Email: {content.contactEmail}</p>
        </div>
      </div>
    </>
  );
}
