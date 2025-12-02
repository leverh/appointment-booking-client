import './Header.css';

const Header = ({ onBackToHome }) => {
  return (
    <header className="booking-header-nav">
      <div className="header-container">
        <div className="logo-section" onClick={onBackToHome}>
          <h1>✂️ StyleBook</h1>
        </div>
        <nav className="nav-links">
          <button className="nav-link" onClick={onBackToHome}>
            ← Back to Home
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;