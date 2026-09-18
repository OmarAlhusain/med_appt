import { useEffect, useState } from 'react';
import './GiveReviews.css';

const doctors = [
  'Dr. Sarah Ahmed',
  'Dr. Michael John',
  'Dr. Layla Hassan',
  'Dr. David Wilson',
  'Dr. Noor Khalid',
  'Dr. Adam Lewis',
  'Dr. Emily Carter',
];

const GiveReviews = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const storedReviews = JSON.parse(
        localStorage.getItem('submittedReviews')
      );

      if (storedReviews) {
        setSubmittedReviews(storedReviews);
      }
    } catch {
      setSubmittedReviews({});
    }
  }, []);

  const hasSubmittedReview = Boolean(
    selectedDoctor && submittedReviews[selectedDoctor]
  );

  const handleDoctorChange = (event) => {
    const doctorName = event.target.value;

    setSelectedDoctor(doctorName);
    setRating('');
    setReview('');
    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedDoctor || !rating || !review.trim()) {
      setMessage('Please complete all review fields.');
      return;
    }

    const reviewData = {
      doctor: selectedDoctor,
      rating,
      review: review.trim(),
      submittedAt: new Date().toISOString(),
    };

    const updatedReviews = {
      ...submittedReviews,
      [selectedDoctor]: reviewData,
    };

    setSubmittedReviews(updatedReviews);

    localStorage.setItem(
      'submittedReviews',
      JSON.stringify(updatedReviews)
    );

    setMessage('Your review has been submitted successfully.');
  };

  return (
    <main className="reviews-page">
      <section className="reviews-card">
        <div className="reviews-heading">
          <span>Patient feedback</span>
          <h1>Give Reviews</h1>
          <p>
            Share your experience and help other patients make informed
            healthcare decisions.
          </p>
        </div>

        <form className="reviews-form" onSubmit={handleSubmit}>
          <div className="review-field">
            <label htmlFor="review-doctor">Doctor</label>

            <select
              id="review-doctor"
              value={selectedDoctor}
              onChange={handleDoctorChange}
              required
            >
              <option value="">Select a doctor</option>

              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          <div className="review-field">
            <label htmlFor="review-rating">Rating</label>

            <select
              id="review-rating"
              value={rating}
              onChange={(event) => {
                setRating(event.target.value);
                setMessage('');
              }}
              disabled={hasSubmittedReview}
              required
            >
              <option value="">Select rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>

          <div className="review-field">
            <label htmlFor="review-text">Review</label>

            <textarea
              id="review-text"
              value={review}
              onChange={(event) => {
                setReview(event.target.value);
                setMessage('');
              }}
              placeholder="Write your review here"
              rows="5"
              disabled={hasSubmittedReview}
              required
            />
          </div>

          {message && (
            <div className="review-message" role="status">
              {message}
            </div>
          )}

          {hasSubmittedReview && !message && (
            <div className="review-submitted-message">
              Review already submitted for this doctor.
            </div>
          )}

          <button
            type="submit"
            className="review-submit-button"
            disabled={hasSubmittedReview}
          >
            {hasSubmittedReview
              ? 'Review Submitted'
              : 'Submit Review'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default GiveReviews;