import React from 'react';
import './movieContent.css';
import Button from './Button';
import { useNavigate } from "react-router-dom";

function MovieContent({ movie }) {
    const navigate = useNavigate();

    const handleReviewClick = () => {
        navigate('/review', { state: { movie: JSON.stringify(movie) } });
    }

    return (
        <div className={`content ${movie.active ? 'active' : undefined}`}>
            <img src={movie.poster_path} alt="" className="movie-title" />
            <h4>
                <div className="title">{movie.title}</div>
                <div className="release">Release date {movie.release_date}</div>
                <div className="rating">Rating {movie.vote_average}</div>
            </h4>
            <p>
                {movie.overview}
            </p>
            <div className="button">
                <Button 
                icon={<ion-icon name="clipboard-outline"></ion-icon>}
                name="Review"
                color="#ff3700"
                bgColor="#ffffff"
                onClick={handleReviewClick}
                />
                <Button icon={<ion-icon name="add-outline"></ion-icon>}
                name="Add as favourite"
                />
            </div>
        </div>
    );
}

export default MovieContent;