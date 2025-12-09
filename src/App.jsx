import { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import BookingPage from './components/BookingPage.jsx';
import Header from './components/Header.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'booking', 'adminLogin', 'admin'
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

  const handleBookNow = () => {
    setCurrentView('booking');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

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

  return (
    <div className="App">
      {currentView === 'home' ? (
        <LandingPage onBookNow={handleBookNow} />
      ) : (
        <>
          <Header onBackToHome={handleBackToHome} />
          <BookingPage />
        </>
      )}
    </div>
  );
}

export default App;