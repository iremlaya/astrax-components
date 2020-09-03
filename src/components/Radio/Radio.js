/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './radio.scss';

/**
 * Primary UI component for user interaction
 */
export const Radio = ({
  primary, backgroundColor, size, label, checked, ...props
}) => {
  const [check, setCheck] = useState((!!checked));
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  const handleClick = () => {
    setCheck(!check);
  };

  return (
    <button
      type="button"
      // className={['checkbox-unchecked', `storybook-button--${size}`, mode].join(' ')}
      className={`radio ${(check && checked) ? ' checked' : ' unchecked'}`}
      style={backgroundColor && { backgroundColor }}
      onClick={handleClick}
      {...props}
    >
      {(check && checked) && <div className="check-radio" />}
    </button>
  );
};

Radio.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  checked: PropTypes.bool,

};

Radio.defaultProps = {
  checked: false,
};
