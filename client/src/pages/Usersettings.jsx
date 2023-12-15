import React, { useState } from 'react';

function Usersettings() {
  // State to manage checkbox values
  const [show_movies, setShowMovies] = useState(true);
  const [show_news, setShowNews] = useState(true);
  const [show_reviews, setShowReviews] = useState(true);
  const [show_posts, setShowPosts] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

//    const user_id = localStorage.getItem('user_id');
    const user_id = "1234";

    const response = await fetch('http://localhost:3001/settings/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ user_id, show_movies, show_news, show_reviews, show_posts }),
    });

    if (!response.ok) {
      const message = await response.text();
      setError(`Fetching failed: ${message}`);
      return;
    }

    const data = await response.json();

    localStorage.setItem('show_movies', data.show_movies);
    localStorage.setItem('show_news', data.show_news);
    localStorage.setItem('show_reviews', data.show_reviews);
    localStorage.setItem('show_posts', data.show_posts);

    window.location.href = '/';
  };

  return (
    <div className="settings">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <form onSubmit={handleSubmit} className="settings-form">
            <label>
                Show Movies
                <input type="checkbox" checked={show_movies} onChange={() => setShowMovies(!show_movies)}/>
            </label>
            <label>
                Show News
                <input type="checkbox" checked={show_news} onChange={() => setShowNews(!show_news)}/>
            </label>
            <label>
                Show Reviews
                <input type="checkbox" checked={show_reviews} onChange={() => setShowReviews(!show_reviews)}/>
            </label>
            <label>
                Show Posts
                <input type="checkbox" checked={show_posts} onChange={() => setShowPosts(!show_posts)}/>
            </label>
            <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
    </div>
  );
};

export default Usersettings;