import Header from './Header';
// import heroImage from '../assets/hero.webp';
// import gallery1 from '../assets/gallery-1.webp';
import gallery2 from '../assets/gallery-2.webp';
import gallery3 from '../assets/gallery-3.webp';
import gallery4 from '../assets/gallery-4.webp';
import { CalendarDays, Users, Scissors, BellRing, Clock, Sparkles } from 'lucide-react';
import DemoBanner from './DemoBanner';
import './LandingPage.css';

const LandingPage = ({ onBookNow }) => {
  return (
    <div className="landing-page">
      <DemoBanner />
      <Header />

      {/* HERO - Full width centered */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <h2>Where Style Meets Precision</h2>
            <p className="hero-description">
              Experience the art of modern hair styling. Book your appointment in seconds 
              and step into a world of professional care and contemporary elegance.
            </p>
            <div className="hero-buttons">
              <button className="btn-hero" onClick={onBookNow}>
                Book Your Appointment
              </button>
            </div>
            <p className="hero-subtext">
              No phone calls • No waiting • Just seamless booking
            </p>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item">
            <div className="trust-number">2.5k+</div>
            <div className="trust-label">Happy Clients</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">15+</div>
            <div className="trust-label">Years Experience</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">4.9</div>
            <div className="trust-label">Average Rating</div>
          </div>
        </div>
      </section>

      {/* SALON SHOWCASE - Asymmetric layout */}
      <section className="salon-showcase">
        <div className="showcase-inner">
          <div className="showcase-content">
            <span className="showcase-eyebrow">Our Space</span>
            <h3>A Sanctuary for Your Style</h3>
            <p>
              Step into our modern salon where warm woods meet clean lines. 
              Every detail is designed to make you feel relaxed while our expert 
              stylists craft your perfect look.
            </p>
            <div className="showcase-features">
              <div className="showcase-feature">Premium organic products</div>
              <div className="showcase-feature">Expert certified stylists</div>
              <div className="showcase-feature">Personalized consultations</div>
              <div className="showcase-feature">Relaxing atmosphere</div>
            </div>
          </div>
          <div className="showcase-gallery">
            <img src={gallery4} alt="Model having their beard trimmed by a stylist" />
            <img src={gallery2} alt="Professional stylist at work" />
            <img src={gallery3} alt="Premium hair care products" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-header">
          <h3>Effortless Booking Experience</h3>
          <p className="features-subtitle">
            Everything you need to schedule your perfect appointment, 
            all in one intuitive system.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <CalendarDays size={28} strokeWidth={1.5} />
            </div>
            <h4>Real-Time Availability</h4>
            <p>
              See open slots instantly and book the time that works best 
              for your schedule. Updated in real-time across all devices.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={28} strokeWidth={1.5} />
            </div>
            <h4>Choose Your Stylist</h4>
            <p>
              Browse profiles of our experienced team and select the stylist 
              who matches your style preferences and needs.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Scissors size={28} strokeWidth={1.5} />
            </div>
            <h4>Full Service Menu</h4>
            <p>
              From precision cuts to color treatments, book any service 
              with detailed descriptions and transparent pricing.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BellRing size={28} strokeWidth={1.5} />
            </div>
            <h4>Smart Reminders</h4>
            <p>
              Receive automatic confirmations and gentle reminders so you 
              never miss your appointment.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="process-section">
        <div className="process-header">
          <h3>Book in Three Simple Steps</h3>
        </div>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h4>Choose Service</h4>
            <p>
              Select from our range of professional services, from classic 
              cuts to complete transformations.
            </p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h4>Pick Your Time</h4>
            <p>
              View real-time availability and choose a slot that fits 
              perfectly into your schedule.
            </p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h4>Confirm & Relax</h4>
            <p>
              Get instant confirmation and show up ready to enjoy your 
              appointment. It's that easy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <h3>Ready for Your Best Look Yet?</h3>
          <p>
            Join thousands of satisfied clients who trust us with their style. 
            Book your appointment today and experience the difference.
          </p>
          <button className="btn-cta" onClick={onBookNow}>
            Book Your Appointment
          </button>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2264.566658462705!2d-73.95029041725283!3d40.743691925131834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sde!4v1764941650602!5m2!1sen!2sde"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cut Theory Location"
          ></iframe>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>Cut Theory • Modern Hair Styling</p>
          <p className="footer-note">
            Demo booking system
          </p>
          <p>Open Source • MIT License • Built by <a href="https://pixelsummit.org">PixelSummit</a></p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;