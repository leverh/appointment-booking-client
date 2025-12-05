import Header from './Header';
import heroImage from '../assets/hero.webp';
import gallery1 from '../assets/gallery-1.webp';
import gallery2 from '../assets/gallery-2.webp';
import gallery3 from '../assets/gallery-3.webp';
import { CalendarDays, Users, Scissors, BellRing} from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onBookNow }) => {
  return (
    <div className="landing-page">
      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <h2>Book Your Perfect Appointment</h2>
            <p className="hero-description">
              Experience seamless booking with our intuitive appointment system.
              Choose your service, pick your preferred stylist, and select a time that works for you.
            </p>

            <button className="btn-hero" onClick={onBookNow}>
              Book an Appointment Now
            </button>

            <p className="hero-subtext">
              No phone calls. No waiting. Just pick a time and you are done.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-photo-wrapper">
              <img src={heroImage} alt="Client getting a haircut in a modern salon" />
            </div>

            {/* Small fake booking preview card for “online system” emphasis */}
            <div className="hero-booking-preview">
              <p className="preview-label">Next appointment available today</p>
              <div className="preview-row">
                <span>Service</span>
                <strong>Cut and Style</strong>
              </div>
              <div className="preview-row">
                <span>Stylist</span>
                <strong>Any available</strong>
              </div>
              <div className="preview-row">
                <span>Time</span>
                <strong>16:30</strong>
              </div>
              <button className="preview-button" onClick={onBookNow}>
                Start Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SMALL IMAGE STRIP */}
      <section className="salon-strip">
        <div className="container strip-inner">
          <div className="strip-text">
            <h3>Clean, modern salon experience</h3>
            <p>
              StyleBook keeps the calendar under control so your team can focus on
              clients in the chair.
            </p>
          </div>
          <div className="strip-gallery">
            <img src={gallery1} alt="Salon interior" />
            <img src={gallery2} alt="Stylist working with client" />
            <img src={gallery3} alt="Hair products and tools" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="container">
          <h3>Why Choose StyleBook?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><CalendarDays size={28} /></div>
              <h4>Easy Scheduling</h4>
              <p>View real time availability and book your appointment in seconds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Users size={28} /></div>
              <h4>Choose Your Stylist</h4>
              <p>Select from your team of experienced professionals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Scissors size={28} /></div>
              <h4>Multiple Services</h4>
              <p>Haircuts, color, treatments and more in one booking flow.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><BellRing size={28} /></div>
              <h4>Instant Confirmation</h4>
              <p>Automatic confirmations and reminders for every visit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h3>Ready to Transform Your Look?</h3>
          <p>Book your appointment today and experience professional service at its best.</p>
          <button className="btn-cta" onClick={onBookNow}>
            Get Started
          </button>
        </div>
        <div className="map-container" style={{ marginTop: '4rem' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2264.566658462705!2d-73.95029041725283!3d40.743691925131834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sde!4v1764941650602!5m2!1sen!2sde"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bistro Mitte Location"
          ></iframe>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <p>Demo Booking System • Built with React and Supabase</p>
          <p className="footer-note">
            This is a portfolio demonstration of a custom appointment booking system.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

