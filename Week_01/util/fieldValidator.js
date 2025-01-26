const fieldValidator = {
  checkIfEmptyString: async (param, fieldName) => {
    if (!param || param.trim().length === 0) {
      throw new Error(`Field ${fieldName} is empty!`);
    }

    return true;
  },

  checkIfEmptyNumber: async (param, fieldName) => {
    if (!param) {
      throw new Error(`Field ${fieldName} is empty!`);
    }
  },

  validateEmail: async (email) => {
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const isValidEmail = await fieldValidator.checkIfEmptyString(email, 'email');

    if (isValidEmail && !String(email).match(emailFormat)) {
      throw new Error(`Invalid email format!`);
    }
  },
};

module.exports = fieldValidator;
