import { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctor, onClose, onBooked }) => {
  const [formData, setFormData] = useState({
    name: sessionStorage.getItem('name') || '',
    phone: sessionStorage.getItem('phone') || '',
    date: '',
    time: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.date ||
      !formData.time
    ) {
      setError('Please complete all appointment fields.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must contain exactly 10 digits.');
      return;
    }

    const appointmentData = {
      patientName: formData.name.trim(),
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      doctorName: doctor.name,
      specialty: doctor.specialty,
    };

    localStorage.setItem(
      doctor.name,
      JSON.stringify(appointmentData)
    );

    localStorage.setItem(
      'doctorData',
      JSON.stringify(doctor)
    );

    window.dispatchEvent(
      new CustomEvent('appointmentBooked', {
        detail: appointmentData,
      })
    );

    if (onBooked) {
      onBooked(appointmentData);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="appointment-form-overlay">
      <section className="appointment-form-card">
        <div className="appointment-form-header">
          <div>
            <span>Book Appointment</span>
            <h2>{doctor.name}</h2>
            <p>{doctor.specialty}</p>
          </div>

          {onClose && (
            <button
              type="button"
              className="appointment-close-button"
              onClick={onClose}
              aria-label="Close appointment form"
            >
              ×
            </button>
          )}
        </div>

        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >
          <div className="appointment-field">
            <label htmlFor="appointment-name">
              Name
            </label>

            <input
              id="appointment-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient name"
              required
            />
          </div>

          <div className="appointment-field">
            <label htmlFor="appointment-phone">
              Phone Number
            </label>

            <input
              id="appointment-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              inputMode="numeric"
              maxLength={10}
              required
            />
          </div>

          <div className="appointment-field">
            <label htmlFor="appointment-date">
              Date of Appointment
            </label>

            <input
              id="appointment-date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="appointment-field">
            <label htmlFor="appointment-time">
              Book Time Slot
            </label>

            <input
              id="appointment-time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div
              className="appointment-form-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="appointment-submit-button"
          >
            Confirm Appointment
          </button>
        </form>
      </section>
    </div>
  );
};

export default AppointmentForm;