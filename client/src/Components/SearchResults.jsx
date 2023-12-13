// components/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import './style.css'; // Import shared styles if needed
import './SearchResults.css';
import Header from '../pages/Header.jsx';
import '../pages/header.css';
import SearchResultsContent from './SearchResultsContent';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = (searchTerm) => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=cf4d8fb3e32d1f38fd41fa0b0cf96851&query=${searchTerm}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => setSearchResults(json.results))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchSearchResults(searchTerm);
  }, [searchTerm]);
  
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <div className="search-results-container">
      <Header />
      <div className="search-results-content">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <h2>Search Results</h2>
        <SearchResultsContent movies={searchResults} />
      </div>
    </div>
  );
};

export default SearchResults;