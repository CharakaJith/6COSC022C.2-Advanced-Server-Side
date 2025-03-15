const celebService = require('../services/celeb.service');

const celebController = {
  searchCelebrity: async (req, res) => {
    try {
      const { name } = req.params;

      const response = await celebService.searchCelebrity(name);
      const { success, status, data } = response;

      return res.status(status).json({
        success: success,
        response: {
          status: status,
          data: data,
        },
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

module.exports = celebController;
