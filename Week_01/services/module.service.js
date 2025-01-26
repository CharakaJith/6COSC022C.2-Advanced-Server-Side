const moduleService = {
  calculateMarks: async (data) => {
    const { cw1, cw2 } = data;

    return Number(cw1) * 0.4 + Number(cw2) * 0.6;
  },
};

module.exports = moduleService;
