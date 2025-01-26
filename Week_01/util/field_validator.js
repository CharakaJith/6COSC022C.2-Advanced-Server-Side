const fieldValidator = {
  validate_string: async (param, fieldName) => {
    if (!param || param.trim().length === 0) {
      return {
        field: fieldName,
        message: `Field ${fieldName} is empty!`,
      };
    }

    return 1;
  },

  validate_number: async (param, fieldName) => {
    if (!param) {
      return {
        field: fieldName,
        message: `Field ${fieldName} is empty!`,
      };
    }

    return 1;
  },

  validate_email: async (email, fieldName) => {
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const isValidEmail = await fieldValidator.validate_string(email, 'email');

    if (isValidEmail && !String(email).match(emailFormat)) {
      return {
        field: fieldName,
        message: `Invalid email format!`,
      };
    }

    return 1;
  },
};

module.exports = fieldValidator;
