const field_validator = {
  validate_string: async (value, param) => {
    if (!value || value.trim().length === 0) {
      return {
        fields: param,
        message: `${param} field is empty!`,
      };
    }

    return 1;
  },

  validate_number: async (value, param) => {
    if (!value) {
      return {
        fields: param,
        message: `${param} field is empty!`,
      };
    }

    return 1;
  },

  validate_email: async (email) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const isValidString = await field_validator.validate_string(email, 'Email');
    if (isValidString != 1) {
      return isValidString;
    }

    if (!email.match(emailformat)) {
      return {
        fields: 'email',
        message: `Invalid email format!`,
      };
    }

    return 1;
  },
};

module.exports = field_validator;
