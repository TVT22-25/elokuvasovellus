import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Reviews.css'; // Import the CSS file

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/users/reviews?user_id=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reviewsData = await response.json();
      const reviewsWithMovies = await Promise.all(reviewsData.map(async review => {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${review.movie_id}?api_key=cf4d8fb3e32d1f38fd41fa0b0cf96851`);

        if (!movieResponse.ok) {
          throw new Error(`HTTP error! status: ${movieResponse.status}`);
        }

        const movieData = await movieResponse.json();
        return { ...review, movie: movieData };
      }));

      setReviews(reviewsWithMovies);
      setLoading(false);
    };

    fetchReviews().catch(error => console.error('Error:', error));
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      {reviews.map(review => (
        <div key={review.review_id} className="review">
          <h2>Movie: {review.movie.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${review.movie.poster_path}`} alt={review.movie.title} />
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
          <p>Created: {new Date(review.created).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;