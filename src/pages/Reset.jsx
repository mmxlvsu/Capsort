import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Reset() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    // If there's a token, redirect to the proper reset password page
    if (token) {
      // Redirect to the ResetPassword component route
      window.location.href = `/reset-password?token=${token}`;
    }
  }, [token]);

  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#1a1851', marginBottom: '20px' }}>Password Reset</h1>
      {token ? (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <h2>Redirecting...</h2>
          <p>Please wait while we redirect you to the password reset page.</p>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <h2>Password Reset</h2>
          <p>This page is for password reset functionality.</p>
          <p>If you have a reset token, it should be included in the URL.</p>
          <button 
            onClick={() => window.location.href = '/signstudent'}
            style={{
              backgroundColor: '#1a1851',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Back to Sign In
          </button>
        </div>
      )}
    </div>
  );
}
