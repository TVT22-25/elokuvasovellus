// components/SearchResultsContent.jsx
import React from 'react';
import Card from './Card';
import MovieContent from './MovieContent';

const SearchResultsContent = ({ movies }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {movies.map((movie) => (
          <div className="col-lg-6 col-md-12" key={movie.id}>
            <Card info={movie} />
            <MovieContent movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsContent;
