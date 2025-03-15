const db = require('../database/connection');

const celebDao = {
  getByName: async (name) => {
    return new Promise((resolve, reject) => {
      const selectQuery = `SELECT * FROM celebs WHERE name LIKE ?`;

      db.all(selectQuery, [`%${name}%`], function (error, rows) {
        if (error) return reject(new Error(`Failed to get celebrity by name ${name}: ${error.message}`));

        return resolve(rows);
      });
    });
  },
};

module.exports = celebDao;
