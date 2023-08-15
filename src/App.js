import NavBar from './HomePage/NavBar';
import  HomePage from './HomePage/HomePage';
import React from 'react';
// import LetsBeginPage from './LetsBeginPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PortfolioPage from './PortfolioPage/PortfolioPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </>
  );
}

export default App;


