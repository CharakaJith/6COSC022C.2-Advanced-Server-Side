const db = require('./connection');
require('dotenv').config();

const initialize = {
  createTables: async () => {
    const tables = [
      // celebrity table
      {
        table: 'celebs',
        query: `CREATE TABLE IF NOT EXISTS celebs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                net_worth INTEGER,
                gender TEXT NOT NULL,
                nationality TEXT,
                occupations TEXT,
                height REAL NOT NULL,
                birthday TEXT NOT NULL,
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
