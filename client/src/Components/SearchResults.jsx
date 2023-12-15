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
    decade: '',
    rating: '',
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query');

  console.log('Search Term:', searchTerm);

  // Function to generate an array of decades for the past century
  const getPastDecades = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - (currentYear % 10);
    return Array.from({ length: startYear / 10 }, (_, index) => startYear - index * 10);
  };

  const fetchSearchResults = (term, filters) => {
    // Construct the API URL with proper parameters
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=cf4d8fb3e32d1f38fd41fa0b0cf96851&query=${term}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        // Filter movies based on the release year, decade, and rating
        const filteredMovies = json.results.filter((movie) => {
          // Extract the year from the "Release date" field
          const releaseYear = new Date(movie.release_date).getFullYear();
          // Check if the movie's release year matches the selected year filter
          const yearMatches = filters.year ? releaseYear.toString() === filters.year : true;

          // Extract the decade from the "Release date" field
          const releaseDecade = Math.floor(releaseYear / 10) * 10;
          // Check if the movie's release decade matches the selected decade filter
          const decadeMatches = filters.decade ? releaseDecade.toString() === filters.decade : true;

          // Extract the integer rating from the original rating (ignoring decimals)
          const ratingInteger = Math.floor(parseFloat(movie.vote_average));

          // Check if the movie's rating matches the selected rating filter
          const ratingMatches = filters.rating ? ratingInteger.toString() === filters.rating : true;

          // Return true if all year, decade, and rating conditions are satisfied
          return yearMatches && decadeMatches && ratingMatches;
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
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            {/* Add more year options as needed */}
          </select>
        </div>

        <div>
          <label>Decade:</label>
          <select onChange={(e) => handleFilterChange('decade', e.target.value)}>
            <option value="">All Decades</option>
            {getPastDecades().map((decade) => (
              <option key={decade} value={decade.toString()}>
                {`${decade}s`}
              </option>
            ))}
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

        <h2>Search Results</h2>
        <SearchResultsContent movies={searchResults} />
      </div>
    </div>
  );
};

export default SearchResults;
