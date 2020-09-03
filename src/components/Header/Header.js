/* eslint-disable import/prefer-default-export */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.scss';
  
export const Header = ({ label, sublabel, children,...props }) => {
  const handleClickGithub = () => {
    window.open("https://github.com/iremlaya/custom-lib", "_blank") 
  }
  const handleClickJotform = () => {

  }
  const handleClickMain = () => {

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
        <button
          type="button"
          // className={['checkbox-unchecked', `storybook-button--${size}`, mode].join(' ')}
          className="github-button"
          onClick={handleClickGithub}
          {...props}
        >
          <div className="github-icon" />
        </button>
        <Link
          to="/Demo"
          // className={['checkbox-unchecked', `storybook-button--${size}`, mode].join(' ')}
          className="jotform-button"
         
        >
          <div className="jotform-icon" />
        </Link>
        <Link
          to="/About"
          // className={['checkbox-unchecked', `storybook-button--${size}`, mode].join(' ')}
          className="about-button"
         
        >
          <div className="about-head"/>
          <div className="about-icon" />
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
