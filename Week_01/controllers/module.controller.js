const moduleController = {
  calculateMarks: async (req, res) => {
    try {
      const { name, emal, cw1, cw2 } = req.body;

      res.status(200).json({
        success: true,
        data: {
          marks: cw1 + cw2,
        },
      });
    } catch (err) {}
  },
};

module.exports = moduleController;
