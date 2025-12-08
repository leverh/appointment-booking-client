import { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get password from environment variable
  // In production, I would use proper authentication (Supabase Auth, JWT, etc.)
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>⚠️ Configuration Error</h1>
        <p>Admin password not configured. Set REACT_APP_ADMIN_PASSWORD environment variable or deployer env variable.</p>
      </div>
    </div>
  );
}

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      onLogin();
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>🔒 Admin Access</h1>
        <p className="admin-login-subtitle">Enter password to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-password-input"
              autoFocus
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        
        <p className="demo-note">
          Demo password: <code>admin123</code>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;