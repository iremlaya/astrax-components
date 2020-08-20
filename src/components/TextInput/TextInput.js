/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './textInput.scss';

export const TextInput = ({ long, ...props }) => {
  const a = 10;
  return (
    <div className="ti-container">
      {long ? (
        <textarea
          className="ti-input long"
          type="text"
          value={props.value}
          onChange={(event) => console.log('value changed!')}
          placeholder="Aa"
        />
      ) : (
        <input
          className="ti-input"
          type="text"
          value={props.value}
          onChange={(event) => console.log('value changed!')}
          placeholder="Aa"
        />
      )}

      <p>// place for errors</p>
    </div>
  );
};

TextInput.propTypes = {
  /**
           * Is this the principal call to action on the page?
           */
  long: PropTypes.bool,
  /**
           * What background color to use
           */
  headerTitle: PropTypes.string,
  listOpen: PropTypes.bool,
  /**
           * Button contents
           */
  label: PropTypes.string.isRequired,
  /**
           * Optional click handler
           */
  onClick: PropTypes.func,
};

TextInput.defaultProps = {
  long: false,
};
