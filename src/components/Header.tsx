import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import About from './About';

const Header = () => {
  const [aboutBox, setAboutBox] = useState(false);

  const setAboutFunction = () => setAboutBox(!aboutBox);

  return (
    <header>
      <About visible={aboutBox} setAbout={setAboutFunction} />
      <h1 id="appTitle">Electron youtube downloader</h1>
      <ul className="menuList">
        <li className="menuItem">
          <Link to="/" className="link">
            Downloader
          </Link>
        </li>
        <li className="menuItem">
          <Link to="/instructions" className="link">
            Instructions
          </Link>
        </li>
        <li className="menuItem">
          <Link to="/defaults" className="link">
            Defaults
          </Link>
        </li>
        <li className="menuItem">
          <button type="button" className="link" onClick={setAboutFunction}>
            About
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
