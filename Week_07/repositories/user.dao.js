const db = require('../database/connection');

const userDao = {
  create: async (user) => {
    return new Promise((resolve, reject) => {
      const insertQuery = 'INSERT INTO users (first_name, last_name, email, password, user_status) VALUES (?, ?, ?, ?, ?);';
      const values = [user.firstName, user.lastName, user.email, user.password, user.status];

      db.run(insertQuery, values, function (error) {
        if (error) return reject(new Error(`Failed to create new user: ${error.message}`));

        userDao
          .getById(this.lastID)
          .then((user) => resolve(user))
          .catch((error) => reject(error));
      });
    });
  },

  getById: async (userId) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM users WHERE id = ?';

      db.get(selectQuery, [userId], function (error, row) {
        if (error) return reject(new Error(`Failed to get user by id ${userId}: ${error.message}`));

        return resolve(row);
      });
    });
  },

  getByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM users WHERE email = ?';

      db.get(selectQuery, [email], function (error, row) {
        if (error) return reject(new Error(`Failed to get user by email ${email}: ${error.message}`));

        return resolve(row);
      });
    });
  },
};

module.exports = userDao;
