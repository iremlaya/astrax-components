/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

/**
 * Primary UI component for user interaction
 */
export const Card = ({ id, header,footer, body,link, ...props }) => {
  return (
      <div className="card-wrapper">
          <div className="card-cover">
              <div className={`card-cover-content ${id === "pcm" ? 'one' : 'two'}`}/>
          </div>
          <div className="card-body-wrapper">
            <div className="card-body">
                <div className="card-header">
                    {header}
                </div>
                <div className="card-content">
                    {body}
                </div>
                <div className="card-button">
                  <span className="c-highlight">
                  <a className="card-button-text" href={link} target="_blank">{footer}</a>
                  </span>
                    
                </div>
            </div>
          </div>
      </div>
  );
};

Card.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the Card be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Card contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Card.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
