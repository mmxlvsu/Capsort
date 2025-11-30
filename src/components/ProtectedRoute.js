import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false, requireStudent = false }) => {
  const { isAuthenticated, isAdmin, isStudent, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signstudent" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/studentdash" replace />;
  }

  if (requireStudent && !isStudent) {
    return <Navigate to="/admindash" replace />;
  }

  return children;
};
