import { useState } from 'react';
import StylistsManager from './StylistsManager';
import ServicesManager from './ServicesManager';
import BookingsManager from './BookingsManager';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, stylists, services

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <h1>✂️ StyleBook Admin</h1>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-container">
        <nav className="admin-nav">
          <button
            className={`nav-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            📅 Bookings
          </button>
          <button
            className={`nav-tab ${activeTab === 'stylists' ? 'active' : ''}`}
            onClick={() => setActiveTab('stylists')}
          >
            👥 Stylists
          </button>
          <button
            className={`nav-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            💇 Services
          </button>
        </nav>

        <div className="admin-content">
          {activeTab === 'bookings' && <BookingsManager />}
          {activeTab === 'stylists' && <StylistsManager />}
          {activeTab === 'services' && <ServicesManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;