const studentService = require('../services/student.service');

const studentController = {
  createNewStudent: async (req, res) => {
    try {
      const data = ({ name, id, email } = req.body);

      const createRes = await studentService.createNewStudent(data);

      return res.status(201).json({
        success: true,
        data: createRes,
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

  getAllStudents: async (req, res) => {
    try {
      const getAllRes = await studentService.getAllStudents();

      return res.status(200).json({
        success: true,
        data: getAllRes,
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

  getStudentById: async (req, res) => {
    try {
      const { id } = req.params;

      const getRes = await studentService.getStudentById(id);

      return res.status(200).json({
        success: true,
        data: getRes,
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

  updateStudentDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const data = ({ name, id, email } = req.body);

      const updateRes = await studentService.updateStudentDetails(id, data);

      return res.status(200).json({
        success: true,
        data: updateRes,
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

  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteRees = await studentService.deleteStudent(id);

      return res.status(200).json({
        success: true,
        data: deleteRees,
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

module.exports = studentController;
