const db = require('./connection');
require('dotenv').config();

const initialize = {
  createTables: async () => {
    const tables = [
      // movie table
      {
        table: 'movies',
        query: `CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            director TEXT NOT NULL,
            genre TEXT NOT NULL,
            rating NUMERIC NOT NULL,
            released DATE NOT NULL, 
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
