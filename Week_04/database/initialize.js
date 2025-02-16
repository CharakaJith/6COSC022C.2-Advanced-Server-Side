const db = require('./connection');
const movieDao = require('../repository/movies.dao');
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

  populateMovies: async () => {
    // sample movies
    const movies = [
      {
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        genre: 'Drama',
        rating: 9.3,
        released: '1994-09-22',
      },
      {
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        genre: 'Crime',
        rating: 9.2,
        released: '1972-03-24',
      },
      {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        genre: 'Action',
        rating: 9.0,
        released: '2008-07-18',
      },
      {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        genre: 'Crime',
        rating: 8.9,
        released: '1994-10-14',
      },
      {
        title: 'The Lord of the Rings: The Return of the King',
        director: 'Peter Jackson',
        genre: 'Adventure',
        rating: 8.9,
        released: '2003-12-17',
      },
    ];

    // populate movies table
    for (const movie of movies) {
      // check if movie exists
      const existingMovie = await movieDao.getByTitleAndDirector(movie);
      if (existingMovie) {
        break;
      } else {
        // insert movie
        const newMovie = await movieDao.create(movie);
        console.log(`Initial movie created: ${newMovie.title}`);
      }
    }
  },
};

module.exports = initialize;
