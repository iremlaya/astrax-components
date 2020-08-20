/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

/**
 * Primary UI component for user interaction
 */
export const Checkbox = ({
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
      className={`checkbox ${(check) ? ' checked' : ' unchecked'}`}
      style={backgroundColor && { backgroundColor }}
      onClick={handleClick}
      {...props}
    >
      {(check) && <div className="check" />}
    </button>
  );
};

Checkbox.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  checked: PropTypes.bool,

};

Checkbox.defaultProps = {
  checked: false,
};
