import React from 'react';
import './style.css';
import './SearchResults.css';
import Header from '../pages/Header.jsx';
import '../pages/header.css';

const SearchResults = () => {
  return (
    <div className="search-results-container">
      {/* Include your header component */}
      <Header>
        {/* ... your header content */}
      </Header>

      {/* Search results content */}
      <div className="search-results-content">
        <h2>Search Results</h2>
        {/* Add your search results content here */}
      </div>
    </div>
  );
};

export default SearchResults;
