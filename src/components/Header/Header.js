/* eslint-disable import/prefer-default-export */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
  
export const Header = ({ label, sublabel, children,...props }) => {
  let location = useLocation();
  const handleClickGithub = () => {
    window.open("https://github.com/iremlaya/custom-lib", "_blank")
    
  }
  return (
    <div className="header-container">
      <div className="header-content">
        <Link 
          to="/home"
          className="moi-button"
        >
          <div className="moi-icon" />
        </Link>
        <div>
          <p className="header-label">{label}</p>
          <p className="header-sublabel">{sublabel}</p>
        </div>
        
      </div>
      <div className="header-buttons">
        <Link
          to="/Home"
          // className={['checkbox-unchecked', `storybook-button--${size}`, mode].join(' ')}
          className="routes"
         
        ><span className={`${location.pathname === '/Home' ? "highlight": ""}`}> Home </span>
        </Link>
        <p
          // className={['checkbox-unchecked', `storybook-button--${size}`, mode].join(' ')}
          className="routes"
          onClick={handleClickGithub}
          {...props}
        >
          GitHub
        </p>
        <Link
          to="/Demo"
          // className={['checkbox-unchecked', `storybook-button--${size}`, mode].join(' ')}
          className="routes"
         
        ><span className={`${location.pathname === '/Demo' ? "highlight": ""}`}> JotForm </span>
        </Link>
        <Link
          to="/About"
          // className={['checkbox-unchecked', `storybook-button--${size}`, mode].join(' ')}
          className="routes"
         
        >
          <span className={`${location.pathname === '/About' ? "highlight": ""}`}> About </span>
        </Link>
      </div>
  
  </div>
  );
};

Header.propTypes = {
  label: PropTypes.string
  
};

Header.defaultProps = {
  label: 'Header'
};
