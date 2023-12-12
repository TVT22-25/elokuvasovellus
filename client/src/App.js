import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Main from './Components/Main.js';
//import Movie from './Movie';
//import './Components/style.css';
//import Card from './Components/Card.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/Header.jsx';
import Banner from './pages/Banner.jsx';
import ReviewPage from './pages/Review';
import SearchBar from './Components/SearchBar.jsx';
import SearchResults from './Components/SearchResults.jsx';

function MainPage() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
        <SearchBar />
      </>
    </Router>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;