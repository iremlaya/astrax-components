import React, { createContext, Component } from 'react';
import { validations } from '../../helpers/validations';
import './form.scss';
export const FormCtx = createContext({
  fields: {},
  errors: {},
});

export default class Form extends Component {
  constructor(props) {
    super(props);

    const {
        isDisabled = false,
        shouldValidateForm,
        defaultClasses
      } = this.props
    
    this.state = {
      fields: {},
      errors: {},
      shouldValidateForm,
      defaultClasses,
      isDisabled,
      isFetching : false
    };
  }

  addField({ field }) {
    const { id } = field;

    // Initiate all field values with default empty string.
    field = {
      value: '',
      ...field,
    };

    if (id) {
      this.setState((prevState) => ({
        ...prevState,
        fields: {
          ...prevState.fields,
          [id]: field,
        },
      }));

      return;
    }

    throw new Error(`please add 'id' field to the input: ${field}`);
  }

  validateField = id => {
    let error = "";
    console.log(this.state.fields);
    console.log(id)
    const {
      value: fieldValue,
      validate,
      displayName,
      customRules = {}
    } = this.state.fields[id];
    const rules = validate ? validate.split("|") : "";
    console.log(rules)

    if (rules.length) {
      for (const rule in rules) {
        const ruleName = rules[rule];
        const validation = validations[ruleName] || customRules[ruleName];
        const isRuleSatisfied =
          ruleName !== "required" && !fieldValue
            ? true
            : validation.rule().test(fieldValue.toString());

        if (!isRuleSatisfied) {
            console.log('error')
          error = validation.formatter.apply(null, [displayName || id]);
        }

        if (error !== "") {
          break;
        }
      }

      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [id]: error
        }
      }));
    }
  };
  setFields = (event, { id, value }) => {
    if (event) {
      event.persist();
    }
    const { fields } = this.state;
    const field = fields[id];

    this.addField({
      field: {
        ...field,
        // consider value passed as the new value if
        // event is not defined. This will be useful
        // when you want to update a field programmatically.

        value: id === 'dropdown' ? value : event ? event.currentTarget.value : value,
      },
    });
  };
  validateForm = fieldName => {
        const { shouldValidateForm, fields } = this.state
        const field = fields[fieldName]

        if (shouldValidateForm) {
        if (field) {
            if ( field.shouldValidateField ) {
            this.validateField(field)
            }

            return
        }

        for (const unit in fields) {
            const fieldData = fields[unit]

            if (fieldData) {
                console.log('fieldData:')
                console.log(fieldData)
            this.validateField(fieldData.id)
            }
        }
        }

        return
    }

  render() {
    const { fields, errors } = this.state;
    console.log("in form: ");
    console.log(fields);    
    const formCtx = {
      fields,
      errors,
      addField: (data) => {
        this.addField(data);
      },
      setFields: this.setFields,
      validateField: this.validateField,
      validateForm: this.validateForm
    };

    

    return (
      <form className="form-container" action="">
        <FormCtx.Provider value={formCtx}>
          {this.props.children}
        </FormCtx.Provider>
      </form>
    );
  }
}
