import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
//import Main from './Components/Main.js';
//import Movie from './Movie';
//import './Components/style.css';
//import Card from './Components/Card.js';
import './App.css';
import Header from './pages/Header.jsx';
import Banner from './pages/Banner.jsx';

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
    <>
      <Header />
      <Banner />
    </>
  );
}

export default App;