import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import citc from '../assets/citc.png';
import '../styles/ResetPassword.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);

  const token = searchParams.get('token');

  useEffect(() => {
    // Check if token exists
    if (!token) {
      setError('Invalid or missing reset token');
      setTokenValid(false);
      return;
    }
    
    // Token exists, assume it's valid for now
    // The backend will validate it when we submit
    setTokenValid(true);
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.newPassword) {
      setError('Password is required');
      return false;
    }
    
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/signstudent');
        }, 3000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show error if no token or invalid token
  if (tokenValid === false) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="reset-password-header">
            <img src={citc} alt="CITC Logo" className="reset-password-logo" />
            <h1 className="reset-password-title">Invalid Reset Link</h1>
          </div>
          <div className="reset-password-error">
            <p>This password reset link is invalid or has expired.</p>
            <p>Please request a new password reset from the login page.</p>
            <button 
              onClick={() => navigate('/signstudent')}
              className="reset-password-button"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show success message
  if (success) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="reset-password-header">
            <img src={citc} alt="CITC Logo" className="reset-password-logo" />
            <h1 className="reset-password-title">Password Reset Successful!</h1>
          </div>
          <div className="reset-password-success">
            <p>Your password has been successfully reset.</p>
            <p>You will be redirected to the login page in a few seconds...</p>
            <button 
              onClick={() => navigate('/signstudent')}
              className="reset-password-button"
            >
              Go to Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="reset-password-header">
          <img src={citc} alt="CITC Logo" className="reset-password-logo" />
          <h1 className="reset-password-title">Reset Your Password</h1>
          <p className="reset-password-subtitle">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="reset-password-form">
          {error && (
            <div className="reset-password-error-message">
              {error}
            </div>
          )}

          <div className="reset-password-form-group">
            <label htmlFor="newPassword" className="reset-password-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="reset-password-input"
              placeholder="Enter your new password"
              required
              minLength="6"
            />
          </div>

          <div className="reset-password-form-group">
            <label htmlFor="confirmPassword" className="reset-password-label">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="reset-password-input"
              placeholder="Confirm your new password"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="reset-password-button"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

        <div className="reset-password-footer">
          <p>
            Remember your password?{' '}
            <span 
              onClick={() => navigate('/signstudent')}
              className="reset-password-link"
            >
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}