import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Splash from "./pages/Splash";
import Signup from "./pages/Signup";
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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Splash />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signstudent" element={<SignStudent />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/guestabout" element={<GuestAbout />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/verify" element={<Verify />} />
          
          {/* Student Protected Routes */}
          <Route path="/studentdash" element={
            <ProtectedRoute requireStudent={true}>
              <StudentDash />
            </ProtectedRoute>
          } />
          <Route path="/studentabout" element={
            <ProtectedRoute requireStudent={true}>
              <StudentAbout />
            </ProtectedRoute>
          } />
          <Route path="/saved" element={
            <ProtectedRoute requireStudent={true}>
              <Saved />
            </ProtectedRoute>
          } />
          
          {/* Admin Protected Routes */}
          <Route path="/admindash" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDash />
            </ProtectedRoute>
          } />
          <Route path="/adminanalytics" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminAnalytics />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
