/* eslint-disable import/prefer-default-export */
import React, {
    useContext, useState, useRef, useEffect,
  } from 'react';
  import PropTypes from 'prop-types';
  // eslint-disable-next-line import/named
  import { FormCtx } from '../Form/Form';
  import './header-text.scss';
  
  export const HeaderText = ({ id, ...props }) => {
    const { fields, addField } = useContext(
      FormCtx
    );
    const field = fields[id] || {};
    const {
      label = "",
    } = field;
  
    useEffect(() => {
      addField({
        field: {id,...props},
        value: "",
      });
    }, []);
  
  
    return field && field.value !== undefined ?(
      <div className="headertext-container">
        <p className="headertext-label">{label}</p>
      </div>
    ) : (
      ''
    );
  };
  
  HeaderText.propTypes = {
    id: PropTypes.number
   
  };
  
  HeaderText.defaultProps = {
    id: null
  };
  