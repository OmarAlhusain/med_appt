import { useEffect, useState } from 'react';
import AppointmentFormIC from './AppointmentFormIC';
import './InstantConsultation.css';

const instantDoctor = {
  name: 'Dr. Emily Carter',
  specialty: 'General Physician',
  experience: '8 years',
  rating: '4.9',
};

const InstantConsultation = () => {
  const [showForm, setShowForm] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const storedAppointment = localStorage.getItem(instantDoctor.name);
    setIsBooked(Boolean(storedAppointment));
  }, []);

  const handleBooked = () => {
    setShowForm(false);
    setIsBooked(true);
  };

  const handleCancel = () => {
    localStorage.removeItem(instantDoctor.name);

    const storedDoctor = JSON.parse(
      localStorage.getItem('doctorData')
    );

    if (storedDoctor?.name === instantDoctor.name) {
      localStorage.removeItem('doctorData');
    }

    setIsBooked(false);

    window.dispatchEvent(
      new CustomEvent('appointmentCancelled', {
        detail: {
          doctorName: instantDoctor.name,
        },
      })
    );
  };

  return (
    <main className="instant-page">
      <section className="instant-container">
        <div className="instant-heading">
          <span>Quick healthcare access</span>
          <h1>Instant Consultation</h1>
          <p>
            Connect with an available healthcare professional using a simple
            booking process.
          </p>
        </div>

        <article className="instant-doctor-card">
          <div className="instant-avatar">EC</div>

          <div className="instant-doctor-info">
            <span>{instantDoctor.specialty}</span>
            <h2>{instantDoctor.name}</h2>

            <p>
              {instantDoctor.experience} experience · ★{' '}
              {instantDoctor.rating}
            </p>
          </div>

          {!isBooked ? (
            <button
              type="button"
              className="instant-book-button"
              onClick={() => setShowForm(true)}
            >
              Book Consultation
            </button>
          ) : (
            <button
              type="button"
              className="instant-cancel-button"
              onClick={handleCancel}
            >
              Cancel Consultation
            </button>
          )}
        </article>

        {showForm && (
          <div className="instant-form-overlay">
            <AppointmentFormIC
              doctor={instantDoctor}
              onClose={() => setShowForm(false)}
              onBooked={handleBooked}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default InstantConsultation;