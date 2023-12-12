import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Main from './Components/Main.js';
//import Movie from './Movie';
//import './Components/style.css';
//import Card from './Components/Card.js';
import './App.css';
import Header from './pages/Header.jsx';
import Banner from './pages/Banner.jsx';
import ReviewPage from './pages/Review';

function MainPage() {
  return (
    <>
      <Header />
      <Banner />
    </>
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