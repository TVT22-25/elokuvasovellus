// SearchResults.js
import React from 'react';

const SearchResults = () => {
  // Retrieve the search query from the URL
  const searchQuery = new URLSearchParams(window.location.search).get('query');

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      {/* Add your search results content here */}
    </div>
  );
};

export default SearchResults;