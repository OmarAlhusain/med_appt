import { useCallback, useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
  const [appointment, setAppointment] = useState(null);

  const loadAppointment = useCallback(() => {
    try {
      const doctorData = JSON.parse(
        localStorage.getItem('doctorData')
      );

      if (!doctorData?.name) {
        setAppointment(null);
        return;
      }

      const storedAppointment = JSON.parse(
        localStorage.getItem(doctorData.name)
      );

      if (!storedAppointment) {
        setAppointment(null);
        return;
      }

      setAppointment({
        ...storedAppointment,
        doctorName:
          storedAppointment.doctorName || doctorData.name,
        specialty:
          storedAppointment.specialty ||
          doctorData.specialty ||
          '',
      });
    } catch {
      setAppointment(null);
    }
  }, []);

  useEffect(() => {
    loadAppointment();

    const handleBooked = (event) => {
      setAppointment(event.detail || null);
    };

    const handleCancelled = () => {
      setAppointment(null);
    };

    window.addEventListener(
      'appointmentBooked',
      handleBooked
    );

    window.addEventListener(
      'appointmentCancelled',
      handleCancelled
    );

    return () => {
      window.removeEventListener(
        'appointmentBooked',
        handleBooked
      );

      window.removeEventListener(
        'appointmentCancelled',
        handleCancelled
      );
    };
  }, [loadAppointment]);

  return (
    <>
      {children}

      {appointment && (
        <aside
          className="appointment-notification"
          aria-live="polite"
        >
          <div className="notification-accent"></div>

          <div className="notification-content">
            <div className="notification-heading">
              <span>Appointment Details</span>

              <button
                type="button"
                onClick={() => setAppointment(null)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>

            <strong>
              {appointment.doctorName}
            </strong>

            {appointment.specialty && (
              <p>
                <span>Specialty</span>
                {appointment.specialty}
              </p>
            )}

            {appointment.patientName && (
              <p>
                <span>Name</span>
                {appointment.patientName}
              </p>
            )}

            {appointment.phone && (
              <p>
                <span>Phone</span>
                {appointment.phone}
              </p>
            )}

            {appointment.date && (
              <p>
                <span>Date</span>
                {appointment.date}
              </p>
            )}

            {appointment.time && (
              <p>
                <span>Time</span>
                {appointment.time}
              </p>
            )}
          </div>
        </aside>
      )}
    </>
  );
};

export default Notification;