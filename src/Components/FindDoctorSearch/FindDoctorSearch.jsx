import { useEffect, useRef, useState } from 'react';
import './FindDoctorSearch.css';

const specialties = [
  'General Physician',
  'Dentist',
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Psychiatrist',
  'Orthopedic',
];

const FindDoctorSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSpecialties, setShowSpecialties] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSpecialties(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowSpecialties(true);

    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSpecialtySelect = (specialty) => {
    setSearchTerm(specialty);
    setShowSpecialties(false);

    if (onSearch) {
      onSearch(specialty);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowSpecialties(false);

    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <section className="doctor-search-section">
      <div className="doctor-search-heading">
        <span>Find the right care</span>
        <h1>Find a Doctor</h1>
        <p>
          Search for healthcare professionals by specialty and book an
          appointment that fits your schedule.
        </p>
      </div>

      <div className="doctor-search-wrapper" ref={searchRef}>
        <div className="doctor-search-box">
          <span className="doctor-search-icon" aria-hidden="true">
            🔍
          </span>

          <input
            type="text"
            value={searchTerm}
            placeholder="Search by doctor specialty"
            aria-label="Search doctors by specialty"
            onChange={handleInputChange}
            onFocus={() => setShowSpecialties(true)}
          />

          {searchTerm && (
            <button
              type="button"
              className="doctor-search-clear"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {showSpecialties && (
          <div className="specialty-dropdown">
            {filteredSpecialties.length > 0 ? (
              filteredSpecialties.map((specialty) => (
                <button
                  type="button"
                  key={specialty}
                  className="specialty-option"
                  onClick={() => handleSpecialtySelect(specialty)}
                >
                  {specialty}
                </button>
              ))
            ) : (
              <div className="specialty-empty">
                No matching specialty found.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FindDoctorSearch;