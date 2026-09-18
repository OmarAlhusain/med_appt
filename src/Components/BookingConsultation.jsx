import { useMemo, useState } from 'react';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';
import AppointmentForm from './AppointmentForm/AppointmentForm';
import './BookingConsultation.css';

const doctors = [
  {
    name: 'Dr. Sarah Ahmed',
    specialty: 'General Physician',
    experience: '10 years',
    rating: '4.9',
    location: 'Dubai',
    description:
      'Provides comprehensive primary care, routine checkups, and general health consultations.',
  },
  {
    name: 'Dr. Michael John',
    specialty: 'Cardiologist',
    experience: '14 years',
    rating: '4.8',
    location: 'Dubai',
    description:
      'Specializes in heart health, cardiovascular screening, and preventive cardiac care.',
  },
  {
    name: 'Dr. Layla Hassan',
    specialty: 'Dermatologist',
    experience: '9 years',
    rating: '4.9',
    location: 'Sharjah',
    description:
      'Provides diagnosis and treatment for skin, hair, and nail conditions.',
  },
  {
    name: 'Dr. David Wilson',
    specialty: 'Dentist',
    experience: '12 years',
    rating: '4.7',
    location: 'Abu Dhabi',
    description:
      'Offers preventive dental care, routine examinations, and restorative treatments.',
  },
  {
    name: 'Dr. Noor Khalid',
    specialty: 'Pediatrician',
    experience: '11 years',
    rating: '4.9',
    location: 'Dubai',
    description:
      'Provides medical care for infants, children, and adolescents.',
  },
  {
    name: 'Dr. Adam Lewis',
    specialty: 'Neurologist',
    experience: '15 years',
    rating: '4.8',
    location: 'Abu Dhabi',
    description:
      'Specializes in neurological conditions affecting the brain, spine, and nervous system.',
  },
];

const BookingConsultation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const filteredDoctors = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return doctors;
    }

    return doctors.filter((doctor) =>
      doctor.specialty.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  const handleBooked = () => {
    setSelectedDoctor(null);
    setRefreshKey((value) => value + 1);
  };

  return (
    <main className="booking-page">
      <FindDoctorSearch onSearch={setSearchTerm} />

      <section className="doctor-results">
        <div className="doctor-results-header">
          <div>
            <span>Available doctors</span>
            <h2>Choose your healthcare professional</h2>
          </div>

          <strong>
            {filteredDoctors.length}{' '}
            {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
          </strong>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="doctor-results-grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={`${doctor.name}-${refreshKey}`}
                doctor={doctor}
                onBook={setSelectedDoctor}
              />
            ))}
          </div>
        ) : (
          <div className="no-doctors-message">
            No doctors found for this specialty.
          </div>
        )}
      </section>

      {selectedDoctor && (
        <AppointmentForm
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBooked={handleBooked}
        />
      )}
    </main>
  );
};

export default BookingConsultation;