const userService = require('../services/user.service');

const userController = {
  signUp: async (req, res) => {
    try {
      const newUser = ({ firstName, lastName, email, password } = req.body);

      const response = await userService.userSignUp(newUser);
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

  login: async (req, res) => {
    try {
      const user = ({ email, password } = req.body);

      const response = await userService.userLogIn(user);
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

module.exports = userController;
