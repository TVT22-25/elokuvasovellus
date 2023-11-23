import React from 'react';
import './movieContent.css';
import Button from './Button';

function MovieContent({ movie }) {
    return (
        <div className={`content ${movie.active ? 'active' : undefined}`}>
            <img src={movie.poster_path} alt="" className="movie-title" />
            <h4>
                <span>{movie.title}</span>
                <span>Release date {movie.release_date}</span>
                <span>Rating {movie.vote_average}</span>
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
                />
                <Button icon={<ion-icon name="add-outline"></ion-icon>}
                name="Add as favourite"
                />
            </div>
        </div>
    );
}

export default MovieContent;