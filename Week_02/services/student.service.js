const { studentArr } = require('../mocks/student.mock');

const studentService = {
  createNewStudent: async (data) => {
    const id = studentArr.length + 1;

    const studentDetails = {
      id: id,
      name: data.name,
      studentId: data.id,
      email: data.email,
    };
    studentArr.push(studentDetails);

    return {
      message: 'New student created!',
      student: studentDetails,
    };
  },

  getAllStudents: async () => {
    return {
      message: 'Fetched all students!',
      students: studentArr,
    };
  },

  getStudentById: async (id) => {
    if (id < 1 || id > studentArr.length) {
      throw new Error(`Invalid student id!`);
    }

    return {
      message: `Fetched student by id: ${id}`,
      student: studentArr[id - 1],
    };
  },

  updateStudentDetails: async (id, data) => {
    if (id < 1 || id > studentArr.length) {
      throw new Error(`Invalid student id!`);
    }

    const studentDetails = {
      id: id,
      name: data.name,
      studentId: data.id,
      email: data.email,
    };
    studentArr[id - 1] = studentDetails;

    return {
      message: `Update student by id: ${id}`,
      student: studentArr[id - 1],
    };
  },

  deleteStudent: async (id) => {
    if (id < 1 || id > studentArr.length) {
      throw new Error(`Invalid student id!`);
    }

    const index = id - 1;
    studentArr.splice(index, 1);

    return {
      message: 'Student deleted!',
    };
  },
};

module.exports = studentService;
