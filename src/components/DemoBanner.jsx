import { useState } from 'react';
import './DemoBanner.css';

const DemoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="demo-banner">
      <div className="demo-banner-content">
        <span className="demo-icon">ℹ️</span>
        <p className="demo-text">
          <strong>Portfolio Demo:</strong> This is a demonstration booking system. 
          Try making a booking or visit <a href="/admin">/admin</a> (password: <code>admin123</code>) to explore the management panel.
        </p>
        <button 
          className="demo-banner-close" 
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;