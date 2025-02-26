const taskDao = require('../repository/task.dao');
const field_validator = require('../util/field_validator');
const { TASK_STATUS } = require('../constants/task.constant');

const taskService = {
  createNewTask: async (data) => {
    const { title, description } = data;

    // validate user inputs
    const errorArray = [];
    errorArray.push(await field_validator.validate_string(title, 'title', 'Task title'));
    errorArray.push(await field_validator.validate_string(description, 'description', 'Task description'));

    // check for validation error
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      return {
        status: 400,
        success: false,
        data: filteredErrors,
      };
    }

    // check task exists
    const task = await taskDao.getByNameAndStatus(title, TASK_STATUS.NEW);
    if (task) {
      return {
        status: 409,
        success: false,
        data: {
          message: `Task ${title} already exists!`,
        },
      };
    }

    // create new task
    const taskObj = {
      userId: 1,
      title: title,
      description: description,
      status: TASK_STATUS.NEW,
    };
    const newTask = await taskDao.create(taskObj);

    return {
      status: 201,
      success: true,
      data: {
        message: 'Task created successfully!',
        data: newTask,
      },
    };
  },

  getAllTasks: async () => {
    // fetch all tasks
    const tasks = await taskDao.getAll();

    // filter out abandoned tasks
    const filteredTasks = tasks.filter((task) => task.status !== TASK_STATUS.ABANDON);
    if (filteredTasks.length == 0) {
      return {
        status: 409,
        success: false,
        data: {
          message: 'No tasks found!',
        },
      };
    }

    return {
      status: 200,
      success: true,
      data: {
        message: 'Fetched all tasks!',
        data: filteredTasks,
      },
    };
  },

  getTaskById: async (id) => {
    // check task
    const task = await taskDao.getById(id);
    if (!task || task.status === TASK_STATUS.ABANDON) {
      return {
        status: 404,
        success: false,
        data: {
          message: `Invalid task id ${id}!`,
        },
      };
    }

    return {
      status: 200,
      success: true,
      data: {
        message: `Fetched task by id: ${id}!`,
        data: task,
      },
    };
  },

  deleteTask: async (id) => {
    // check task
    let task = await taskDao.getById(id);
    if (!task || task.status === TASK_STATUS.ABANDON) {
      return {
        status: 404,
        success: false,
        data: {
          message: `Invalid task id ${id}!`,
        },
      };
    }

    // delete task (status to ABANDONED)
    task.status = TASK_STATUS.ABANDON;
    const deletedTask = await taskDao.update(task);

    return {
      status: 200,
      success: true,
      data: {
        message: 'Task updated successfully!',
        data: deletedTask,
      },
    };
  },
};

module.exports = taskService;
