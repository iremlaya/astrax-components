/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './loading.scss';

/**
 * Primary UI component for user interaction
 */
const Filler = (props) => <div className="filler" style={{ width: `${props.percentage}%` }} />;

const ProgressBar = (props) => (
  <div className="progress-bar">
    <Filler percentage={props.percentage} />
  </div>
);

export const Loading = ({
  dots, label, slider, ...props
}) => {
  const [percentage, setPercentage] = useState(0);

  const nextStep = (step) => {
    if (percentage === 100) return;
    setPercentage(percentage + step);
  };
  const renderHeader = () => {
    if (label) {
      return (
        // <div className={`header ${mode}`}>
        <div className="header">
          {label}
        </div>
      );
    }
    return null;
  };
  const renderLoading = () => (
    <div className={`loading-wrapper ${dots ? ' dots' : ' progress'}`}>
      {dots ? <div className="dot-pulse" /> : <ProgressBar percentage={percentage} />}
    </div>
  );

  return (
    <div className="loading-container">
      {renderHeader()}
      {renderLoading()}
    </div>
  );
};

Loading.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the Loading be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Loading contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Loading.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
