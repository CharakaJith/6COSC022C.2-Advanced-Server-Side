const db = require('./connection');
require('dotenv').config();

const initialize = {
  createTables: async () => {
    const tables = [
      // task table
      {
        table: 'tasks',
        query: `CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                status TEXT NOT NULL,
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
