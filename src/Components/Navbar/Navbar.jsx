import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(
      sessionStorage.getItem('auth-token') ||
      sessionStorage.getItem('email')
    )
  );

  useEffect(() => {
    setIsLoggedIn(
      Boolean(
        sessionStorage.getItem('auth-token') ||
        sessionStorage.getItem('email')
      )
    );
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('phone');

    localStorage.removeItem('doctorData');

    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="navbar-brand">
          <span className="brand-mark">+</span>

          <span className="brand-copy">
            <strong>StayHealthy</strong>
            <small>Care anywhere, anytime</small>
          </span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/appointments" className="nav-link">
            Appointments
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>

              <Link to="/signup" className="nav-button">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;