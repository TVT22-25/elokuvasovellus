import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Navigate to Search Results page with the search term
      navigate(`/search-results?query=${searchTerm}`);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <ion-icon name="search-outline"></ion-icon>
    </div>
  );
}

export default Search;
