import React, { useState } from "react";
 

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isElementVisible, setIsElementVisible] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="navbar-logo-container">
            <img className="navbar-logo-img" src="/images/tech_work_logo.png" alt="Logo"/>
            <h1>techWork_Studios</h1>
          </div>
          <div className='navbar-links-container'>
            <a href="about.html" onClick={closeMenu}>about</a>
            <a href="portfolio.html" onClick={closeMenu}>portfolio</a>
            <a href="work_it_out.html" onClick={closeMenu}>lets begin</a>
          </div>
          <div className="hamburger-button-container">
            <button onClick={() => setIsElementVisible(!isElementVisible)}>
              <i className="fa fa-bars"></i>
            </button>
          </div>
        </nav>
      </header>
      {isElementVisible && <div id={`myLinks`}>
        <ul>
          <li><a href="about.html" onClick={closeMenu}>about</a></li>
          <li><a href="portfolio.html" onClick={closeMenu}>portfolio</a></li>
          <li><a href="work_it_out.html" onClick={closeMenu}>lets begin</a></li>
        </ul>
      </div>}
    </div>
  );
};

export default NavBar
