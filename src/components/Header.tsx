import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1 id="appTitle">Mike-Mp's youtube downloader</h1>
      <ul className="menuList">
        <li>
          <Link to="/">Index</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
