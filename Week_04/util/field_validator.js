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
};

module.exports = field_validator;
