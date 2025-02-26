const taskService = require('../service/task.service');

const taskController = {
  createNewTask: async (req, res) => {
    try {
      const taskData = ({ title, description } = req.body);

      const response = await taskService.createNewTask(taskData);
      const { status, success, data } = response;

      return res.status(status).json({
        success: success,
        data: data,
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

  getAllTasks: async (req, res) => {
    try {
      const response = await taskService.getAllTasks();
      const { status, success, data } = response;

      return res.status(status).json({
        success: success,
        data: data,
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

  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await taskService.getTaskById(id);
      const { status, success, data } = response;

      return res.status(status).json({
        success: success,
        data: data,
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

  updateTask: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {
          message: error.message,
        },
      });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await taskService.deleteTask(id);
      const { status, success, data } = response;

      return res.status(status).json({
        success: success,
        data: data,
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

module.exports = taskController;
