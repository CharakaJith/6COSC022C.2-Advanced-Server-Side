const field_validator = {
  validate_string: async (field, param, fieldName) => {
    if (!field || field.trim().length === 0) {
      return {
        field: param,
        message: `${fieldName} field is empty!`,
      };
    }

    return 1;
  },

  validate_number: async (field, param, fieldName) => {
    if (!field) {
      return {
        field: param,
        message: `${fieldName} field is empty!`,
      };
    }

    return 1;
  },

  validate_date: async (field, param, fieldName) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    const isValidString = await field_validator.validate_string(field, param, fieldName);
    if (isValidString != 1) {
      return isValidString;
    }

    if (!field.match(dateRegex)) {
      return {
        field: param,
        message: `Invalid format for ${fieldName}`,
      };
    }

    return 1;
  },
};

module.exports = field_validator;
