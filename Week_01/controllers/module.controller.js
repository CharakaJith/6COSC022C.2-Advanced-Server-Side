const moduleService = require('../services/module.service');

const moduleController = {
  calculateMarks: async (req, res) => {
    try {
      const { name, emal, cw1, cw2 } = req.body;

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
