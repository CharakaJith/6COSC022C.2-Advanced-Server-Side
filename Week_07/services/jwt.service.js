const jwt = require('jsonwebtoken');

const jwtService = {
  generateAccessToken: async (tokenUser) => {
    try {
      return jwt.sign({ tokenUser }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '3h',
      });
    } catch (error) {
      throw new Error(`Failed to generate access token: ${error.message}`);
    }
  },
};

module.exports = jwtService;
