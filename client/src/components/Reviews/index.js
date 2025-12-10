import React, { useState } from 'react';
import axios from 'axios';

const Reviews = ({ recipeId }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (rating < 1 || rating > 5) {
            setError('Rating must be between 1 and 5');
            return;
        }

        try {
            const response = await axios.post('/api/reviews', {
                recipeId,
                rating,
                review,
            });
            if (response.status === 201) {
                setSuccess('Review submitted successfully!');
                setRating(0);
                setReview('');
            }
        } catch (err) {
            setError('Failed to submit review. Please try again later.');
        }
    };

    return (
        <div className="reviews-container">
            <h2>Submit Your Review</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating (1-5):</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="review">Review:</label>
                    <textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default Reviews;