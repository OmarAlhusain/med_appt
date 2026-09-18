import { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ doctorName = '', onSubmit }) => {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!rating || !review.trim()) {
      setError('Please provide both a rating and review.');
      return;
    }

    const reviewData = {
      doctor: doctorName,
      rating,
      review: review.trim(),
    };

    if (onSubmit) {
      onSubmit(reviewData);
    }

    setSubmitted(true);
    setError('');
  };

  return (
    <section className="review-form-card">
      <div className="review-form-heading">
        <span>Share your experience</span>
        <h2>Review Form</h2>

        {doctorName && (
          <p>
            Reviewing <strong>{doctorName}</strong>
          </p>
        )}
      </div>

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="review-form-field">
          <label htmlFor="review-form-rating">Rating</label>

          <select
            id="review-form-rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            disabled={submitted}
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

        <div className="review-form-field">
          <label htmlFor="review-form-text">Review</label>

          <textarea
            id="review-form-text"
            rows="5"
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="Write your review"
            disabled={submitted}
            required
          />
        </div>

        {error && (
          <div className="review-form-error" role="alert">
            {error}
          </div>
        )}

        {submitted && (
          <div className="review-form-success">
            Review submitted successfully.
          </div>
        )}

        <button
          type="submit"
          className="review-form-submit"
          disabled={submitted}
        >
          {submitted ? 'Review Submitted' : 'Submit Review'}
        </button>
      </form>
    </section>
  );
};

export default ReviewForm;