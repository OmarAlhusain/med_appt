import { useState } from 'react';
import './AppointmentFormIC.css';

const AppointmentFormIC = ({ doctor, onClose, onBooked }) => {
  const [formData, setFormData] = useState({
    name: sessionStorage.getItem('name') || '',
    phone: sessionStorage.getItem('phone') || '',
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

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please complete all fields.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must contain exactly 10 digits.');
      return;
    }

    const appointmentData = {
      patientName: formData.name.trim(),
      phone: formData.phone,
      doctorName: doctor?.name || 'Instant Consultation Doctor',
      consultationType: 'Instant Consultation',
    };

    localStorage.setItem(
      appointmentData.doctorName,
      JSON.stringify(appointmentData)
    );

    if (doctor) {
      localStorage.setItem(
        'doctorData',
        JSON.stringify(doctor)
      );
    }

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
    <section className="instant-form-card">
      <div className="instant-form-header">
        <div>
          <span>Instant Consultation</span>
          <h2>Book a Consultation</h2>
        </div>

        {onClose && (
          <button
            type="button"
            className="instant-close-button"
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
        )}
      </div>

      <form
        className="instant-consultation-form"
        onSubmit={handleSubmit}
      >
        <div className="instant-field">
          <label htmlFor="instant-name">Name</label>
          <input
            id="instant-name"
            name="name"
            type="text"
            placeholder="Enter patient name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="instant-field">
          <label htmlFor="instant-phone">
            Phone Number
          </label>
          <input
            id="instant-phone"
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

        {error && (
          <div className="instant-form-error" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="instant-submit-button"
        >
          Book Consultation
        </button>
      </form>
    </section>
  );
};

export default AppointmentFormIC;