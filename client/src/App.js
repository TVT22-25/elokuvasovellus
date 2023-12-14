import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
//import Main from './Components/Main.js';
//import Movie from './Movie';
//import './Components/style.css';
//import Card from './Components/Card.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/Header.jsx';
import Banner from './pages/Banner.jsx';
import SearchResults from './Components/SearchResults.jsx';
import ReviewPage from './pages/Review';

function App() {

  //return (
  //  <>
  //    <Main/>
  //  </>
  // );

  //return (
  //  <div>
  //    <Movie/>
  //  </div>
  // );

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;