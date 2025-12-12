import { useState } from 'react';
// import exclamationMark from '../assets/exclamation-mark.svg';
import { AlertCircle } from 'lucide-react';
import './DemoBanner.css';

const DemoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="demo-banner">
      <div className="demo-banner-content">
        <AlertCircle className="demo-icon" size={24} />
        <p className="demo-text">
          <strong>This is a Demo:</strong> This is a booking system demonstration. 
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