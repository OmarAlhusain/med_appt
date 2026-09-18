import { useEffect, useState } from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor, onBook }) => {
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const storedAppointment = localStorage.getItem(doctor.name);
    setIsBooked(Boolean(storedAppointment));
  }, [doctor.name]);

  const handleBookAppointment = () => {
    localStorage.setItem('doctorData', JSON.stringify(doctor));

    if (onBook) {
      onBook(doctor);
    }
  };

  const handleCancelAppointment = () => {
    localStorage.removeItem(doctor.name);

    const storedDoctor = JSON.parse(
      localStorage.getItem('doctorData')
    );

    if (storedDoctor?.name === doctor.name) {
      localStorage.removeItem('doctorData');
    }

    setIsBooked(false);

    window.dispatchEvent(
      new CustomEvent('appointmentCancelled', {
        detail: {
          doctorName: doctor.name,
        },
      })
    );
  };

  return (
    <article className="doctor-card">
      <div className="doctor-avatar" aria-hidden="true">
        {doctor.name
          .split(' ')
          .map((part) => part[0])
          .join('')
          .slice(0, 2)}
      </div>

      <div className="doctor-card-content">
        <div className="doctor-card-header">
          <div>
            <span className="doctor-specialty">
              {doctor.specialty}
            </span>

            <h2>{doctor.name}</h2>
          </div>

          <span className="doctor-rating">
            ★ {doctor.rating}
          </span>
        </div>

        <div className="doctor-meta">
          <span>
            <strong>Experience:</strong>{' '}
            {doctor.experience}
          </span>

          <span>
            <strong>Location:</strong>{' '}
            {doctor.location}
          </span>
        </div>

        <p className="doctor-description">
          {doctor.description}
        </p>

        <div className="doctor-card-footer">
          <span className="booking-fee">
            No booking fee
          </span>

          {!isBooked ? (
            <button
              type="button"
              className="book-appointment-button"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
          ) : (
            <button
              type="button"
              className="cancel-appointment-button"
              onClick={handleCancelAppointment}
            >
              Cancel Appointment
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default DoctorCard;