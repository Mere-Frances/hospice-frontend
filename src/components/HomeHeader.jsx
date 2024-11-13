import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeHeader = ({ title, desc, image_url, btn, btnLink }) => {
  return (
    <header className="hero-header" style={{ backgroundImage: `url(${image_url})` }}>
      <div className="home-header-title">
        <h3>{desc}</h3>
        <h1>{title}</h1>
        <button className="primary-button">
          <NavLink to={btnLink}>{btn}</NavLink>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
