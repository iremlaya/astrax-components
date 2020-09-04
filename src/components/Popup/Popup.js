
import React from "react";
import "./popup.scss";
import PropTypes from "prop-types";

export const Popup = ({header, body, footer, footerAlt,...props}) => {
  const onClose = e => {
    props.onClose && props.onClose(e);
  };
  const render = () => {
    if (!props.show) {
      return null;
    }
    return (
      <div className="popup-container">
        <div className="popup-cover">
              <div className="popup-cover-content"/>
          </div>
            <div className="popup-body">
              
                <div className="popup-content">
                    {body}
                </div>
                
          </div>
      </div>
    );
  }
   return(
       {render}
   )
}
Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};