const field_validator = {
  validate_date_format: async (date) => {
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;

    if (!date.match(dateRegex)) {
      throw new Error('Invalid date format!');
    }
  },

  validate_and_get_date: async (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);

    // check date and month range
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error('Invalid date!');
    }

    // create date object
    const date = new Date(year, month - 1, day);

    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      throw new Error('Invalid date!');
    }

    return date;
  },
};

module.exports = field_validator;
