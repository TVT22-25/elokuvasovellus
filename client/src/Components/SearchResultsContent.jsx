// components/SearchResultsContent.jsx
import React from 'react';
import MovieContent from './MovieContent';

const SearchResultsContent = ({ movies }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {movies.map((movie) => (
          <div className="col-lg-6 col-md-12" key={movie.id}>
            <MovieContent movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsContent;
