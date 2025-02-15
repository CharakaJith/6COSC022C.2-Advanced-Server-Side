const dateService = require('../services/date.service');

const dateController = {
  calculateAge: async (req, res) => {
    try {
      const { date } = req.body;

      const calculateRes = await dateService.calculateAge(date);

      return res.status(200).json({
        success: true,
        data: calculateRes,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {
          message: error.message,
        },
      });
    }
  },
};

module.exports = dateController;
