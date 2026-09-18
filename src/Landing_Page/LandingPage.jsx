import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Healthcare made accessible</span>

          <h1>
            Your Health,
            <span> Our Responsibility</span>
          </h1>

          <p>
            Connect with trusted healthcare professionals, book appointments,
            and manage your healthcare journey from one convenient platform.
          </p>

          <div className="hero-actions">
            <Link to="/appointments" className="hero-primary-button">
              Book an Appointment
            </Link>

            <Link to="/signup" className="hero-secondary-button">
              Create Account
            </Link>
          </div>

          <div className="hero-features">
            <div>
              <strong>Easy Booking</strong>
              <span>Schedule appointments in just a few steps.</span>
            </div>

            <div>
              <strong>Trusted Doctors</strong>
              <span>Find healthcare professionals by specialty.</span>
            </div>

            <div>
              <strong>Your Health Records</strong>
              <span>Keep your profile and reports accessible.</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="medical-card">
            <div className="medical-icon">+</div>
            <p>StayHealthy</p>
            <strong>Care anywhere, anytime.</strong>

            <div className="medical-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;