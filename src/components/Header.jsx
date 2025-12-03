import scissors from '../assets/scissors.png';
import './Header.css';

const Header = ({ showBackButton = false, onBackToHome }) => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div
          className="logo-section"
          onClick={onBackToHome}
          role={onBackToHome ? 'button' : undefined}
        >
          <img src={scissors} alt="StyleBook logo" className="logo-mark" />
          <div className="logo-text">
            <span className="logo-title">StyleBook</span>
            <span className="logo-tagline">Smart Appointment Booking</span>
          </div>
        </div>

        {showBackButton && (
          <nav className="nav-links">
            <button className="nav-link" onClick={onBackToHome}>
              ← Back to Home
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
