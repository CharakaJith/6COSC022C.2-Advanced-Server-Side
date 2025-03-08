const db = require('./connection');
require('dotenv').config();

const initialize = {
  createTables: async () => {
    const tables = [
      // user table
      {
        table: 'users',
        query: `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                user_status TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );`,
      },
    ];

    // create tables
    for (const { table, query } of tables) {
      await new Promise((resolve, reject) => {
        db.run(query, (error) => {
          if (error) {
            console.log(`Failed to create database table '${table}': ${error.message}`);
            return reject(error);
          }

          console.log(`Table '${table}' created successfully or already exists!`);
          return resolve();
        });
      });
    }
  },
};

module.exports = initialize;
