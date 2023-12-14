import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';
import './SearchResults.css';
import Header from '../pages/Header.jsx';
import SearchResultsContent from './SearchResultsContent';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  console.log('Search Term:', query);

  const fetchSearchResults = (term) => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=cf4d8fb3e32d1f38fd41fa0b0cf96851&query=${term}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => setSearchResults(json.results))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  return (
    <div className="search-results-container">
      <Header />
      <div className="search-results-content">
        <h2>Search Results</h2>
        <SearchResultsContent movies={searchResults} />
      </div>
    </div>
  );
};

export default SearchResults;
