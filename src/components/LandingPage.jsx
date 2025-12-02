import './LandingPage.css';

const LandingPage = ({ onBookNow }) => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <div className="logo">
            <h1>✂️ StyleBook</h1>
            <p className="tagline">Smart Appointment Booking</p>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Book Your Perfect Appointment</h2>
            <p className="hero-description">
              Experience seamless booking with our intuitive appointment system. 
              Choose your service, pick your preferred stylist, and select a time that works for you.
            </p>
            <button className="btn-hero" onClick={onBookNow}>
              Book an Appointment Now
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h3>Why Choose StyleBook?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h4>Easy Scheduling</h4>
              <p>View real-time availability and book your appointment in seconds</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h4>Choose Your Stylist</h4>
              <p>Select from our team of experienced professionals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💆</div>
              <h4>Multiple Services</h4>
              <p>From haircuts to color treatments, we've got you covered</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✉️</div>
              <h4>Instant Confirmation</h4>
              <p>Get immediate confirmation of your booking</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h3>Ready to Transform Your Look?</h3>
          <p>Book your appointment today and experience professional service at its best.</p>
          <button className="btn-cta" onClick={onBookNow}>
            Get Started
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <p>Demo Booking System • Built with React & Supabase</p>
          <p className="footer-note">
            This is a portfolio demonstration of a custom appointment booking system.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;