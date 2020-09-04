
import React from "react";
import "./modal.scss";
import PropTypes from "prop-types";

export const Modal = ({header, body, footer, footerAlt,...props}) => {
  const onClose = e => {
    props.onClose && props.onClose(e);
  };
  const render = () => {
    if (!props.show) {
      return null;
    }
    return (
      <div className="modal-container">
        <div className="modal-cover">
              <div className="modal-cover-content"/>
          </div>
            <div className="modal-body">
                <div className="modal-header">
                    {header}
                </div>
                <div className="modal-content">
                    {body}
                </div>
                <div className="modal-button">
                  <button onClick={onClose} className="modal-footer">
                      {footer}
                  </button>
                  <button onClick={onClose} className="modal-footer-alt">
                      {footerAlt}
                  </button>
                </div>
          </div>
      </div>
    );
  }
   return(
       {render}
   )
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};