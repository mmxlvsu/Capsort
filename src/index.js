import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Splash from "./pages/Splash";
import Signup from "./pages/Signup";
import SignAdmin from "./pages/SignAdmin";
import SignStudent from "./pages/SignStudent";
import Guest from "./pages/Guest";
import GuestAbout from "./pages/GuestAbout";
import StudentDash from "./pages/StudentDash";
import StudentAbout from "./pages/StudentAbout";
import Verify from "./pages/Verify";
import Reset from "./pages/Reset";
import Saved from "./pages/Saved";
import AdminDash from "./pages/AdminDash";
import AdminAnalytics from "./pages/AdminAnalytics";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
  <Route path="/" element={<Splash />} />      {/* <-- default/root */}
  <Route path="/splash" element={<Splash />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/signadmin" element={<SignAdmin />} />
  <Route path="/signstudent" element={<SignStudent />} />
  <Route path="/guest" element={<Guest />} />
  <Route path="/guestabout" element={<GuestAbout />} />
  <Route path="/studentdash" element={<StudentDash />} />
  <Route path="/studentabout" element={<StudentAbout />} />
  <Route path="/reset" element={<Reset />} />
  <Route path="/verify" element={<Verify />} />
  <Route path="/saved" element={<Saved />} />
  <Route path="/admindash" element={<AdminDash />} />
  <Route path="/adminanalytics" element={<AdminAnalytics />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
