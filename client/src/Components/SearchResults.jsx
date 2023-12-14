import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';
import './SearchResults.css';
import Header from '../pages/Header.jsx';
import SearchResultsContent from './SearchResultsContent';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    year: '',
    rating: '',
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query');

  console.log('Search Term:', searchTerm);

  const fetchSearchResults = (term, filters) => {
    // Construct the API URL with proper parameters
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=cf4d8fb3e32d1f38fd41fa0b0cf96851&query=${term}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        // Filter movies based on the release year and rating
        const filteredMovies = json.results.filter((movie) => {
          // Extract the year from the "Release date" field
          const releaseYear = new Date(movie.release_date).getFullYear();
          // Check if the movie's release year matches the selected year filter
          const yearMatches = filters.year ? releaseYear.toString() === filters.year : true;

          // Extract the integer rating from the original rating (ignoring decimals)
          const ratingInteger = Math.floor(parseFloat(movie.vote_average));

          // Check if the movie's rating matches the selected rating filter
          const ratingMatches = filters.rating ? ratingInteger.toString() === filters.rating : true;

          // Return true if both year and rating conditions are satisfied
          return yearMatches && ratingMatches;
        });

        // Set the filtered results
        setSearchResults(filteredMovies);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchSearchResults(searchTerm, selectedFilters);
  }, [searchTerm, selectedFilters]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  return (
    <div className="search-results-container">
      <Header />
      <div className="search-results-content">
        {/* UI for Dropdown Filters */}
        <div>
          <label>Release Year:</label>
          <select onChange={(e) => handleFilterChange('year', e.target.value)}>
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            {/* Add more year options as needed */}
          </select>
        </div>

        <div>
          <label>Rating:</label>
          <select onChange={(e) => handleFilterChange('rating', e.target.value)}>
            <option value="">All Ratings</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>

        {/* Add more filter UI elements as needed */}

        <h2>Search Results</h2>
        <SearchResultsContent movies={searchResults} />
      </div>
    </div>
  );
};

export default SearchResults;
