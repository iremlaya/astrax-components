/* eslint-disable import/prefer-default-export */
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { FormCtx } from '../Form/Form';
import './button.scss';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ 
  ghost, 
  backgroundColor,
  size,
  label, 
  displayName,
  onClick,
  classes,
  loadingClass,
  loadingText,
  ...props }) => {
  
  const { validateForm, formData = {}, setFormData, fields } = useContext(
    FormCtx
  );
  const { defaultClasses, isFetching, errors } = formData

  const mode = ghost ? 'storybook-button--ghost' : 'storybook-button--default';
  
  const finishRequest = ({ apiErrors = '' } = {}) => {
    const newState = {
      apiErrors,
      isFetching : false
    }

    setFormData(newState)
  }

  return (
    <button
      type="submit"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
      onClick={(event) => {
        event.preventDefault()
        if (!isFetching) {
          validateForm()
          console.log(errors)
          if ( !(errors && Object.values(errors).join('').length === 0)) {
            
            //setFormData({ isFetching : true })
            onClick({
              fields,
              finishRequest
            })
          }
        }
      }}
      
    >
      {isFetching ? loadingText : displayName}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  displayName             : PropTypes.string.isRequired,
  loadingText             : PropTypes.string,
  loadingClass            : PropTypes.string,
  shouldUseDefaultClasses : PropTypes.bool,
  events                  : PropTypes.shape({
    onClick : PropTypes.func
  }),
  classes : PropTypes.shape({
    buttonClass : PropTypes.string,
    contClass   : PropTypes.string
  })
};

Button.defaultProps = {
  backgroundColor: null,
  ghost: false,
  size: 'medium',
  validateForm : PropTypes.func.isRequired,
  setFormData  : PropTypes.func.isRequired,
  formData     : PropTypes.shape({
    defaultClasses : PropTypes.shape({
      labelClass : '',
      contClass  : '',
      errorClass : '',
      fieldClass : ''
    }),
    isFetching : PropTypes.bool, 
    errors : PropTypes.object // eslint-disable-line
  }),
};
