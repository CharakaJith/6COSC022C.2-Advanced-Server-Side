const db = require('../database/connection');

const taskDao = {
  create: async (task) => {
    return new Promise((resolve, reject) => {
      const insertQuery = 'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)';
      const values = [task.userId, task.title, task.description, task.status];

      db.run(insertQuery, values, function (error) {
        if (error) return reject(new Error(`Failed to create new task: ${error.message}`));

        return taskDao
          .getById(this.lastID)
          .then((task) => resolve(task))
          .catch((error) => reject(error));
      });
    });
  },

  getAll: async () => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM tasks';

      db.all(selectQuery, function (error, rows) {
        if (error) return reject(new Error(`Failed to get all tasks: ${error.message}`));

        return resolve(rows);
      });
    });
  },

  getById: async (taskId) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM tasks WHERE id = ?';

      db.get(selectQuery, [taskId], function (error, row) {
        if (error) return reject(new Error(`Failed to get task by id ${movieId}: ${error.message}`));

        return resolve(row);
      });
    });
  },

  getByNameAndStatus: async (title, status) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM tasks WHERE title = ? AND status = ?';
      const values = [title, status];

      db.get(selectQuery, values, function (error, row) {
        if (error) return reject(new Error(`Failed to get ${status} task by title ${title}: ${error.message}`));

        return resolve(row);
      });
    });
  },

  update: async (task) => {
    return new Promise((resolve, reject) => {
      const updateQuery = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
      const values = [task.title, task.description, task.status, task.id];

      db.run(updateQuery, values, function (error) {
        if (error) return reject(new Error(`Failed to update task ${task.id}: ${error.message}`));

        return taskDao
          .getById(task.id)
          .then((task) => resolve(task))
          .catch((error) => reject(error));
      });
    });
  },
};

module.exports = taskDao;
