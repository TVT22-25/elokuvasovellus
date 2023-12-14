import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Main from './Components/Main.js';
//import Movie from './Movie';
//import './Components/style.css';
//import Card from './Components/Card.js';
import './App.css';
import Header from './pages/Header.jsx';
import Banner from './pages/Banner.jsx';
import ReviewPage from './pages/Review';
import SearchResults from './Components/SearchResults.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Reviews from './pages/Reviews';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:id/reviews" element={<Reviews />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;