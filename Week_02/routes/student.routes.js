const express = require('express');
const studentController = require('../controllers/student.controller');

const studentRouter = express.Router();

studentRouter.post('/', studentController.createNewStudent);
studentRouter.get('/', studentController.getAllStudents);
studentRouter.get('/:id', studentController.getStudentById);
studentRouter.put('/:id', studentController.updateStudentDetails);
studentRouter.delete('/:id', studentController.deleteStudent);

module.exports = studentRouter;
