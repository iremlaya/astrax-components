/* eslint-disable import/prefer-default-export */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/named
import { FormCtx } from '../Form/Form';
import './textInput.scss';

export const TextInput = ({ id, ...props }) => {
  const { fields, setFields, addField, errors, validateField } = useContext(
    FormCtx
  );
  const field = fields[id] || {};
  const fieldError = errors[id] || "";
  const {
    name,
    rows,
    value,
    validate,
    placeholder,
    label = "",
    type = "text",
    events = {},
    classes = {},
    basic = true,
    phoneNumber,
  } = field;

  const { onChange, ...restEvents } = events;
  const { contClass, fieldClass, errorClass } = classes;

  const handleChange = event => {
    try {
      setFields(event, field);
    } catch (error) {
      throw error;
    }

    if (typeof onChange === "function") {
      onChange({
        ...field,
        value: event.target.value
      });
    }
  };

  useEffect(() => {
    addField({
      field: {id,...props},
      value: "",
    });
  }, []);


  const fieldProps = {
    ...restEvents,
    id,
    name,
    type,
    value,
    validate,
    placeholder,
    className: fieldClass,
    onChange: handleChange
  };
  if (type === "textarea") {
    delete fieldProps.type;
    delete fieldProps.value;

    fieldProps.defaultValue = value;
    fieldProps.rows = rows || 2;
  }

  return field && field.value !== undefined ?(
    <div className="ti-container">
      <p className="ti-label">{label}</p>
      {type === "textarea" ? (
        <textarea
          className={`ti-input long ${fieldError ? 'error' : ''}`}
          type="text"
          value={field && field.value}
          onChange={(event) => setFields(event, field)}
          placeholder="Aa"
          onBlur={() => field ? validateField(id) : null}
        />
      ) : (
        <input
          className={`ti-input ${basic ? 'default' : ''} ${fieldError ? 'error' : ''}`}
          type="text"
          value={field && field.value}
          onChange={(event) => setFields(event, field)}
          placeholder={`${phoneNumber ? '(5xx)-xxxxxxx' : basic ? 'Enter here' : 'Aa'}`}
          onBlur={() => field ? validateField(id) : null}
        />
      )}

      <p className={"ti-error"}>{fieldError}</p>
    </div>
  ) : (
    ''
  );
};

TextInput.propTypes = {
  /**
           * Is this the principal call to action on the page?
           */
  long: PropTypes.bool,
  id: PropTypes.number
 
};

TextInput.defaultProps = {
  long: false,
  id: null
};
