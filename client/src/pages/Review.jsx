import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import './Review.css';

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = JSON.parse(location.state.movie);
  const token = localStorage.getItem('token');

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      movie_id: movie.id,
      rating,
      comment
    };

    const response = await fetch('http://localhost:3001/reviews/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(review)
    });
  
    if (!response.ok) {
      const message = await response.text();
      setError(`Server responded with status ${response.status}: ${message}`);
    } else {
      const result = await response.json();
      console.log(`Server responded with: ${JSON.stringify(result)}`);
      navigate('/');
    }
  

    setRating(0);
    setComment('');
  };

  return (
    <div className="container">
      <h2 className="title">{movie.title}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          Rating:
          <StarRatingComponent 
            name="rating" 
            starCount={5}
            value={rating}
            onStarClick={(nextValue) => setRating(nextValue)}
          />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={e => setComment(e.target.value)} className="input" required />
        </label>
        <button type="submit" className="button">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewPage;