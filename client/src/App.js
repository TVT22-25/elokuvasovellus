import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
//import Main from './Components/Main.js';
//import Movie from './Movie';
//import './Components/style.css';
//import Card from './Components/Card.js';
import './App.css';
import './pages/header.css';
import Header from './pages/Header.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.js';
//import Banner from './pages/Banner.jsx';

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
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
  );
}

export default App;



//<Route path="/groups" element={<Groups />} />