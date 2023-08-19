import NavBar from './HomePage/NavBar';
import  HomePage from './HomePage/HomePage';
import  ContactPage from './ContactPage/ContactPage';
import React from 'react';
// import LetsBeginPage from './LetsBeginPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PortfolioPage from './PortfolioPage/PortfolioPage';
import MovieMuse from './MovieMuse/MovieMuse';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/portfolio" element={<PortfolioPage />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="/moviemuse" element={<MovieMuse />} />
      </Routes>
    </>
  );
}

export default App;


