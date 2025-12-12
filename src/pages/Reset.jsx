export default function Reset() {
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
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        This is a test page to confirm the route is working.
      </p>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '400px'
      }}>
        <h2>Reset Component Loaded Successfully!</h2>
        <p>URL: {window.location.href}</p>
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
    </div>
  );
}
