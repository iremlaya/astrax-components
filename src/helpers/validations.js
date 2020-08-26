/* eslint-disable import/prefer-default-export */
export const validations = {
  required: {
    rule: () => /\S/,
    formatter(fieldName) {
      return `${fieldName} is required.`;
    },
  },
  numeric: {
    rule: () => /^\d+$/,
    formatter(fieldName) {
      return `${fieldName} should contain only numbers.`;
    },
  },
  email: {
    rule: () => /\S+@\S+\.\S+/,
    formatter(fieldName) {
      return `${fieldName} should be valid.`;
    },
  },
  phone: {
    rule: () => /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    formatter(fieldName) {
      return `${fieldName} should be valid.`;
    },
  }
};
