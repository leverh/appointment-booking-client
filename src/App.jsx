import { useState, useEffect } from 'react';
import './App.css';
import BookingPage from './components/BookingPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('booking'); // 'booking', 'adminLogin', 'admin'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Check URL for admin route on mount
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setCurrentView('adminLogin');
    }
  }, []);

  // Update URL when view changes
  useEffect(() => {
    if (currentView === 'adminLogin' || currentView === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  }, [currentView]);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentView('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('adminLogin');
  };

  // Render based on current view
  if (currentView === 'adminLogin') {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  if (currentView === 'admin' && isAdminAuthenticated) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // Default: show booking page
  return (
    <div className="App">
      <BookingPage />
    </div>
  );
}

export default App;