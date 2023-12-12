import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

function ReviewPage() {
  const location = useLocation();
  const movie = JSON.parse(location.state.movie);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJ1c2VyX2lkIjoxNiwiaWF0IjoxNzAyMzYwNTMzLCJleHAiOjE3MDI0NDY5MzN9.l1z9liArYCmMe9LpFDVGhrZdlaONpWOcHWIXgZ8hQqA';

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      movie_id: movie.id,
      rating,
      comment<
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
      console.error(`Server responded with status ${response.status}`);
    } else {
      const result = await response.json();
      console.log(`Server responded with: ${JSON.stringify(result)}`);
    }
  

    setRating(0);
    setComment('');
  };

  const styles = {
    container: {
        margin: '0 auto',
        width: '50%',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
      },
      title: {
        textAlign: 'center',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      },
      input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      },
      button: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{movie.title}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
          <textarea value={comment} onChange={e => setComment(e.target.value)} style={styles.input} required />
        </label>
        <button type="submit" style={styles.button}>Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewPage;