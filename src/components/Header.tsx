import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import About from './About';

const Header = () => {
  const [aboutBox, setAboutBox] = useState(false);

  const setAboutFunction = () => setAboutBox(!aboutBox);

  console.log(aboutBox);

  return (
    <header>
      <About visible={aboutBox} setAbout={setAboutFunction} />
      <h1 id="appTitle">Mike-Mp's youtube downloader</h1>
      <ul className="menuList">
        <li className="menuItem">
          <Link to="/">Index</Link>
        </li>
        <li className="menuItem">
          <button type="button" onClick={setAboutFunction}>
            About
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
