import { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get password from environment variable
  // In production, I'd use proper authentication (Supabase Auth, JWT, etc. - whatever you prefer)
  const DEMO_PASSWORD = 'admin123';
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleSubmit = (e) => {
  e.preventDefault();
  
  if (password === ADMIN_PASSWORD) {
    console.log('🔐 Logged in with admin password');
    onLogin();
  } else if (password === DEMO_PASSWORD) {
    console.log('👤 Logged in with demo password');
    onLogin();
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