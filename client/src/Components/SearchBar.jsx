// SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Navigate to Search Results page with the search term
            navigate(`/search-results?query=${searchTerm}`);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress} // Use onKeyDown instead of onKeyPress
            />
        </div>
    );
};

export default SearchBar;