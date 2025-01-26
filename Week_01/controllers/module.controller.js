const moduleService = require('../services/module.service');
const field_validator = require('../util/field_validator');

const moduleController = {
  calculateMarks: async (req, res) => {
    try {
      const { name, email, cw1, cw2 } = req.body;

      // validate user inputs
      const errorArray = [];
      errorArray.push(await field_validator.validate_string(name, 'name'));
      errorArray.push(await field_validator.validate_email(email, 'email'));
      errorArray.push(await field_validator.validate_number(cw1, 'cw1'));
      errorArray.push(await field_validator.validate_number(cw2, 'cw2'));

      // check inputs
      const filteredErrors = errorArray.filter((obj) => obj !== 1);
      if (filteredErrors.length !== 0) {
        return res.status(400).json({
          success: false,
          error: filteredErrors,
        });
      }

      const data = { cw1, cw2 };
      const calculateMarksResponse = await moduleService.calculateMarks(data);

      res.status(200).json({
        success: true,
        data: {
          marks: calculateMarksResponse,
        },
      });
    } catch (err) {}
  },
};

module.exports = moduleController;
