import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: 'patient',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
  };

  const validateForm = () => {
    if (formData.name.trim().length < 4) {
      return 'Name must contain at least 4 characters.';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      return 'Phone number must contain exactly 10 digits.';
    }

    if (formData.password.length < 8) {
      return 'Password must contain at least 8 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const baseUrl = API_URL.replace(/\/$/, '');

      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.error?.[0]?.msg ||
          data?.errors?.[0]?.msg ||
          data?.error ||
          'Unable to create your account.';

        throw new Error(message);
      }

      if (data.authtoken) {
        sessionStorage.setItem('auth-token', data.authtoken);
        sessionStorage.setItem('name', formData.name.trim());
        sessionStorage.setItem('email', formData.email.trim());
        sessionStorage.setItem('phone', formData.phone);
        sessionStorage.setItem('role', formData.role);

        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="signup-page">
      <section className="signup-card">
        <div className="signup-heading">
          <span className="signup-eyebrow">Join StayHealthy</span>
          <h1>Create your account</h1>
          <p>
            Register to find doctors, book appointments, and manage your
            healthcare from one place.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="patient">Patient</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              minLength={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              inputMode="numeric"
              maxLength={10}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <button
            className="signup-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="signup-login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default SignUp;