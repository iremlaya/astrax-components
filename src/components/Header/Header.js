/* eslint-disable import/prefer-default-export */
import React, {
    useContext, useState, useRef, useEffect,
  } from 'react';
  import PropTypes from 'prop-types';
  // eslint-disable-next-line import/named
  import { FormCtx } from '../Form/Form';
  import './header.scss';
  
  export const Header = ({ id, ...props }) => {
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
      <div className="header-container">
        <p className="header-label">{label}</p>
      </div>
    ) : (
      ''
    );
  };
  
  Header.propTypes = {
    id: PropTypes.number
   
  };
  
  Header.defaultProps = {
    id: null
  };
  